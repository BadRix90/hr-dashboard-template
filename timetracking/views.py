from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.contrib.auth import get_user_model
from .models import Project, TimeEntry
from .serializers import ProjectSerializer, TimeEntrySerializer

User = get_user_model()

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer
permission_classes = [IsAuthenticated]

class TimeEntryViewSet(viewsets.ModelViewSet):
    queryset = TimeEntry.objects.all()
    serializer_class = TimeEntrySerializer
    
    def create(self, request):
        data = request.data.copy()
        user = request.user if request.user.is_authenticated else User.objects.first()
        
        time_entry = TimeEntry.objects.create(
            user=user,
            project_id=data.get('project'),
            start_time=data.get('start_time'),
            end_time=data.get('end_time'),
            description=data.get('description', ''),
            duration_minutes=data.get('duration_minutes', 0)
        )
        
        serializer = self.get_serializer(time_entry)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def start_timer(self, request):
        project_id = request.data.get('project_id')
        user = request.user if request.user.is_authenticated else User.objects.first()
        
        time_entry = TimeEntry.objects.create(user=user, project_id=project_id, start_time=timezone.now())
        return Response(self.get_serializer(time_entry).data)
    
    @action(detail=True, methods=['post'])
    def stop_timer(self, request, pk=None):
        time_entry = self.get_object()
        time_entry.end_time = timezone.now()
        time_entry.duration_minutes = int((time_entry.end_time - time_entry.start_time).total_seconds() / 60)
        time_entry.save()
        return Response(self.get_serializer(time_entry).data)
