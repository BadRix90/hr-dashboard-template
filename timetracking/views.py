from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.contrib.auth import get_user_model
from users.permissions import IsAdminOrManager
from .models import Project, TimeEntry
from .serializers import ProjectSerializer, TimeEntrySerializer

User = get_user_model()

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrManager]

class TimeEntryViewSet(viewsets.ModelViewSet):
    queryset = TimeEntry.objects.all()
    serializer_class = TimeEntrySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'manager']:
            return TimeEntry.objects.all()
        return TimeEntry.objects.filter(user=user)
    
    def create(self, request):
        time_entry = TimeEntry.objects.create(
            user=request.user,
            project_id=request.data.get('project'),
            start_time=request.data.get('start_time'),
            end_time=request.data.get('end_time'),
            description=request.data.get('description', ''),
            duration_minutes=request.data.get('duration_minutes', 0)
        )
        return Response(self.get_serializer(time_entry).data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def start_timer(self, request):
        time_entry = TimeEntry.objects.create(
            user=request.user,
            project_id=request.data.get('project_id'),
            start_time=timezone.now()
        )
        return Response(self.get_serializer(time_entry).data)
    
    @action(detail=True, methods=['post'])
    def stop_timer(self, request, pk=None):
        time_entry = self.get_object()
        time_entry.end_time = timezone.now()
        duration = (time_entry.end_time - time_entry.start_time).total_seconds() / 60
        time_entry.duration_minutes = int(duration)
        time_entry.save()
        return Response(self.get_serializer(time_entry).data)