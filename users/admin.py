from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'role', 'department', 'is_staff']
    list_filter = ['role', 'is_staff', 'is_active']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('HR Information', {'fields': ('role', 'department', 'vacation_days', 'phone', 'hire_date')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('HR Information', {'fields': ('role', 'department', 'vacation_days')}),
    )