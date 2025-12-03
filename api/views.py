from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Employee, VacationRequest, TimeEntry, Notification
from .serializers import (
    EmployeeSerializer, 
    VacationRequestSerializer, 
    VacationRequestCreateSerializer,
    TimeEntrySerializer, 
    TimeEntryCreateSerializer,
    NotificationSerializer
)


class EmployeeViewSet(viewsets.ModelViewSet):
    """Employee ViewSet"""
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    # permission_classes = [IsAuthenticated]  # Später aktivieren

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Aktueller Mitarbeiter"""
        try:
            employee = request.user.employee
            serializer = self.get_serializer(employee)
            return Response(serializer.data)
        except Employee.DoesNotExist:
            return Response(
                {'error': 'Kein Mitarbeiterprofil gefunden'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Dashboard Statistiken"""
        total = Employee.objects.count()
        return Response({
            'total_members': total,
            'active_today': total - 3,  # Mock-Daten
            'on_vacation': 3
        })


class VacationRequestViewSet(viewsets.ModelViewSet):
    """Vacation Request ViewSet"""
    queryset = VacationRequest.objects.all()
    # permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return VacationRequestCreateSerializer
        return VacationRequestSerializer

    def get_queryset(self):
        """Filter für aktuellen User"""
        # Später: return self.queryset.filter(employee=self.request.user.employee)
        return self.queryset.all()

    def perform_create(self, serializer):
        """Erstelle Urlaubsantrag für aktuellen User"""
        # Später: serializer.save(employee=self.request.user.employee)
        employee = Employee.objects.first()  # Mock für Development
        serializer.save(employee=employee)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Urlaubsantrag genehmigen"""
        vacation = self.get_object()
        vacation.status = 'approved'
        vacation.save()
        serializer = self.get_serializer(vacation)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """Urlaubsantrag ablehnen"""
        vacation = self.get_object()
        vacation.status = 'rejected'
        vacation.save()
        serializer = self.get_serializer(vacation)
        return Response(serializer.data)


class TimeEntryViewSet(viewsets.ModelViewSet):
    """Time Entry ViewSet"""
    queryset = TimeEntry.objects.all()
    # permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return TimeEntryCreateSerializer
        return TimeEntrySerializer

    def get_queryset(self):
        """Filter für aktuellen User"""
        # Später: return self.queryset.filter(employee=self.request.user.employee)
        return self.queryset.all()

    def perform_create(self, serializer):
        """Erstelle Zeiteintrag für aktuellen User"""
        # Später: serializer.save(employee=self.request.user.employee)
        employee = Employee.objects.first()  # Mock für Development
        serializer.save(employee=employee)

    @action(detail=False, methods=['get'])
    def weekly_stats(self, request):
        """Wochenstatistiken"""
        from datetime import datetime, timedelta
        from django.db.models import Sum
        
        today = datetime.now().date()
        week_start = today - timedelta(days=today.weekday())
        
        entries = self.get_queryset().filter(date__gte=week_start)
        
        weekly_data = []
        for i in range(7):
            day = week_start + timedelta(days=i)
            day_entries = entries.filter(date=day)
            total_hours = sum([entry.duration for entry in day_entries])
            
            weekly_data.append({
                'day': ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][i],
                'hours': total_hours
            })
        
        return Response(weekly_data)


class NotificationViewSet(viewsets.ModelViewSet):
    """Notification ViewSet"""
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter für aktuellen User"""
        # return self.queryset.filter(employee=self.request.user.employee)
        return self.queryset.all()

    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        """Alle als gelesen markieren"""
        self.get_queryset().update(read=True)
        return Response({'status': 'success'})

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """Als gelesen markieren"""
        notification = self.get_object()
        notification.read = True
        notification.save()
        serializer = self.get_serializer(notification)
        return Response(serializer.data)