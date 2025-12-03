from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Employee, VacationRequest, TimeEntry, Notification


class UserSerializer(serializers.ModelSerializer):
    """User Serializer"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class EmployeeSerializer(serializers.ModelSerializer):
    """Employee Serializer"""
    user = UserSerializer(read_only=True)
    vacation_days_available = serializers.ReadOnlyField()
    
    class Meta:
        model = Employee
        fields = [
            'id', 'user', 'phone', 'department', 'role', 'avatar',
            'vacation_days_total', 'vacation_days_used', 
            'vacation_days_available', 'created_at', 'updated_at'
        ]


class VacationRequestSerializer(serializers.ModelSerializer):
    """Vacation Request Serializer"""
    employee = EmployeeSerializer(read_only=True)
    days = serializers.ReadOnlyField()
    
    class Meta:
        model = VacationRequest
        fields = [
            'id', 'employee', 'start_date', 'end_date', 'reason',
            'status', 'days', 'created_at', 'updated_at'
        ]


class VacationRequestCreateSerializer(serializers.ModelSerializer):
    """Vacation Request Create Serializer"""
    class Meta:
        model = VacationRequest
        fields = ['start_date', 'end_date', 'reason']


class TimeEntrySerializer(serializers.ModelSerializer):
    """Time Entry Serializer"""
    employee = EmployeeSerializer(read_only=True)
    duration = serializers.ReadOnlyField()
    
    class Meta:
        model = TimeEntry
        fields = [
            'id', 'employee', 'date', 'start_time', 'end_time',
            'project', 'description', 'duration', 'created_at', 'updated_at'
        ]


class TimeEntryCreateSerializer(serializers.ModelSerializer):
    """Time Entry Create Serializer"""
    class Meta:
        model = TimeEntry
        fields = ['date', 'start_time', 'end_time', 'project', 'description']


class NotificationSerializer(serializers.ModelSerializer):
    """Notification Serializer"""
    class Meta:
        model = Notification
        fields = [
            'id', 'type', 'title', 'message', 'read', 'created_at'
        ]