from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, TimeEntry

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class TimeEntrySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    
    class Meta:
        model = TimeEntry
        fields = ['id', 'user', 'project', 'project_name', 'start_time', 
                  'end_time', 'description', 'duration_minutes', 'created_at']
        read_only_fields = ['created_at']