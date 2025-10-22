from rest_framework import serializers
from django.contrib.auth.models import User
from .models import VacationRequest

class VacationRequestSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.username', read_only=True)
    
    class Meta:
        model = VacationRequest
        fields = ['id', 'employee', 'employee_name', 'start_date', 'end_date', 
                  'type', 'days', 'status', 'reason', 'rejection_reason', 
                  'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'status']

class VacationBalanceSerializer(serializers.Serializer):
    employee_id = serializers.IntegerField()
    total_days = serializers.IntegerField()
    used_days = serializers.IntegerField()
    remaining_days = serializers.IntegerField()
    pending_days = serializers.IntegerField()