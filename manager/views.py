from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.db.models import Sum, Count
from django.http import HttpResponse
from timetracking.models import TimeEntry
from vacation.models import VacationRequest
import csv
from datetime import datetime, timedelta

class TeamOverviewViewSet(viewsets.ViewSet):
    def list(self, request):
        users = User.objects.filter(profile__is_active=True)
        team_data = []
        
        for user in users:
            total_minutes = TimeEntry.objects.filter(user=user).aggregate(
                total=Sum('duration_minutes')
            )['total'] or 0
            
            hours_worked = total_minutes // 60
            expected_hours = 160
            overtime = hours_worked - expected_hours
            
            vacation_taken = VacationRequest.objects.filter(
                employee=user,
                status='approved',
                type='urlaub'
            ).aggregate(total=Sum('days'))['total'] or 0
            
            status_value = 'working'
            active_vacation = VacationRequest.objects.filter(
                employee=user,
                status='approved',
                start_date__lte=datetime.now().date(),
                end_date__gte=datetime.now().date()
            ).exists()
            
            if active_vacation:
                status_value = 'vacation'
            
            team_data.append({
                'name': user.get_full_name() or user.username,
                'hours_worked': hours_worked,
                'overtime_hours': max(0, overtime),
                'vacation_days': vacation_taken,
                'status': status_value
            })
        
        return Response(team_data)

class OvertimeViewSet(viewsets.ViewSet):
    def list(self, request):
        entries = TimeEntry.objects.select_related('user', 'project').all()
        overtime_data = []
        
        for entry in entries:
            if entry.duration_minutes > 480:
                overtime_minutes = entry.duration_minutes - 480
                overtime_data.append({
                    'employee': entry.user.get_full_name() or entry.user.username,
                    'date': entry.start_time.date(),
                    'hours': round(overtime_minutes / 60, 1),
                    'reason': entry.project.name
                })
        
        return Response(overtime_data[:20])

class ExportCSVView(APIView):
    def post(self, request):
        export_type = request.data.get('type', 'time-entries')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        datev_format = request.data.get('datev_format', False)
        
        response = HttpResponse(content_type='text/csv; charset=utf-8')
        response['Content-Disposition'] = f'attachment; filename="export_{export_type}_{datetime.now().strftime("%Y%m%d")}.csv"'
        
        writer = csv.writer(response, delimiter=';')
        
        if datev_format:
            writer.writerow(['DATEV', datetime.now().isoformat()])
        
        if export_type == 'time-entries':
            writer.writerow(['Datum', 'Mitarbeiter', 'Projekt', 'Stunden', 'Beschreibung'])
            
            entries = TimeEntry.objects.select_related('user', 'project')
            
            if start_date:
                entries = entries.filter(start_time__date__gte=start_date)
            if end_date:
                entries = entries.filter(start_time__date__lte=end_date)
            
            for entry in entries:
                writer.writerow([
                    entry.start_time.strftime('%d.%m.%Y'),
                    entry.user.get_full_name() or entry.user.username,
                    entry.project.name,
                    round(entry.duration_minutes / 60, 2),
                    entry.description
                ])
        
        elif export_type == 'vacation':
            writer.writerow(['Mitarbeiter', 'Von', 'Bis', 'Tage', 'Typ', 'Status'])
            
            requests = VacationRequest.objects.select_related('employee')
            
            if start_date:
                requests = requests.filter(start_date__gte=start_date)
            if end_date:
                requests = requests.filter(end_date__lte=end_date)
            
            for req in requests:
                writer.writerow([
                    req.employee.get_full_name() or req.employee.username,
                    req.start_date.strftime('%d.%m.%Y'),
                    req.end_date.strftime('%d.%m.%Y'),
                    req.days,
                    req.type,
                    req.status
                ])
        
        elif export_type == 'overtime':
            writer.writerow(['Mitarbeiter', 'Datum', 'Überstunden', 'Grund'])
            
            entries = TimeEntry.objects.select_related('user', 'project')
            
            if start_date:
                entries = entries.filter(start_time__date__gte=start_date)
            if end_date:
                entries = entries.filter(start_time__date__lte=end_date)
            
            for entry in entries:
                if entry.duration_minutes > 480:
                    overtime_hours = (entry.duration_minutes - 480) / 60
                    writer.writerow([
                        entry.user.get_full_name() or entry.user.username,
                        entry.start_time.strftime('%d.%m.%Y'),
                        round(overtime_hours, 2),
                        entry.project.name
                    ])
        
        return response