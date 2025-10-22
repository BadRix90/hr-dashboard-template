from django.contrib import admin
from .models import Project, TimeEntry

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['name', 'description']

@admin.register(TimeEntry)
class TimeEntryAdmin(admin.ModelAdmin):
    list_display = ['user', 'project', 'start_time', 'end_time', 'duration_minutes']
    list_filter = ['project', 'start_time']
    search_fields = ['user__username', 'project__name']