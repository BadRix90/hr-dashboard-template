from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.db.models import Sum
from django.http import HttpResponse
from django.utils import timezone
from users.permissions import IsAdminOrManager
from timetracking.models import TimeEntry
from vacation.models import VacationRequest
import csv
from datetime import datetime, timedelta

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAdminOrManager])
def team_overview(request):
    total_employees = User.objects.filter(is_active=True).count()
    today = timezone.now().date()
    
    on_vacation = VacationRequest.objects.filter(
        status='approved',
        start_date__lte=today,
        end_date__gte=today
    ).count()
    
    sick_today = VacationRequest.objects.filter(
        status='approved',
        type='krank',
        start_date__lte=today,
        end_date__gte=today
    ).count()
    
    present_today = total_employees - on_vacation - sick_today
    
    return Response({
        'total_employees': total_employees,
        'present_today': max(0, present_today),
        'on_vacation': on_vacation,
        'sick_today': sick_today
    })

@api_view(['GET'])
@permission_classes([IsAdminOrManager])
def pending_requests(request):
    requests = VacationRequest.objects.filter(status='pending').select_related('employee')
    
    data = [{
        'id': req.id,
        'employee_name': req.employee.get_full_name() or req.employee.username,
        'type': req.type,
        'start_date': req.start_date,
        'end_date': req.end_date,
        'days': req.days,
        'reason': req.reason or ''
    } for req in requests]
    
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAdminOrManager])
def overtime_summary(request):
    users = User.objects.filter(is_active=True)
    overtime_data = []
    now = timezone.now()
    month_start = now.replace(day=1, hour=0, minute=0, second=0)
    
    for user in users:
        total_minutes = TimeEntry.objects.filter(user=user).aggregate(
            total=Sum('duration_minutes')
        )['total'] or 0
        
        month_minutes = TimeEntry.objects.filter(
            user=user,
            start_time__gte=month_start
        ).aggregate(total=Sum('duration_minutes'))['total'] or 0
        
        expected_hours = 160
        total_overtime = max(0, (total_minutes / 60) - expected_hours)
        month_overtime = max(0, (month_minutes / 60) - expected_hours)
        
        overtime_data.append({
            'employee_id': user.id,
            'employee_name': user.get_full_name() or user.username,
            'total_overtime': round(total_overtime, 1),
            'current_month': round(month_overtime, 1)
        })
    
    return Response(sorted(overtime_data, key=lambda x: x['total_overtime'], reverse=True))

class ExportCSVView(APIView):
    permission_classes = [IsAdminOrManager]
    
    def post(self, request):
        export_type = request.data.get('type', 'time-entries')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        
        response = HttpResponse(content_type='text/csv; charset=utf-8')
        filename = f"export_{export_type}_{datetime.now().strftime('%Y%m%d')}.csv"
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        
        writer = csv.writer(response, delimiter=';')
        
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
        
        return response