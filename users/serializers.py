from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['role', 'department', 'hire_date', 'vacation_days', 'is_active']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    status = serializers.CharField(source='profile.is_active', read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                  'profile', 'status', 'date_joined']
        read_only_fields = ['date_joined']

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    role = serializers.ChoiceField(choices=UserProfile.ROLE_CHOICES)
    department = serializers.CharField(required=False, allow_blank=True)
    vacation_days = serializers.IntegerField(default=30)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name',
                  'role', 'department', 'vacation_days']
    
    def create(self, validated_data):
        role = validated_data.pop('role')
        department = validated_data.pop('department', '')
        vacation_days = validated_data.pop('vacation_days', 30)
        
        user = User.objects.create_user(**validated_data)
        
        UserProfile.objects.create(
            user=user,
            role=role,
            department=department,
            vacation_days=vacation_days
        )
        
        return user