from django.contrib import admin
from .models import Employee, VacationRequest, TimeEntry, Notification


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['user', 'department', 'role', 'vacation_days_available', 'created_at']
    list_filter = ['department', 'created_at']
    search_fields = ['user__first_name', 'user__last_name', 'user__email', 'department', 'role']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('User Info', {
            'fields': ('user', 'phone', 'avatar')
        }),
        ('Work Info', {
            'fields': ('department', 'role')
        }),
        ('Vacation', {
            'fields': ('vacation_days_total', 'vacation_days_used')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(VacationRequest)
class VacationRequestAdmin(admin.ModelAdmin):
    list_display = ['employee', 'start_date', 'end_date', 'days', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['employee__user__first_name', 'employee__user__last_name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Request Info', {
            'fields': ('employee', 'start_date', 'end_date', 'reason')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['approve_requests', 'reject_requests']
    
    def approve_requests(self, request, queryset):
        queryset.update(status='approved')
        self.message_user(request, f'{queryset.count()} requests approved')
    approve_requests.short_description = 'Approve selected requests'
    
    def reject_requests(self, request, queryset):
        queryset.update(status='rejected')
        self.message_user(request, f'{queryset.count()} requests rejected')
    reject_requests.short_description = 'Reject selected requests'


@admin.register(TimeEntry)
class TimeEntryAdmin(admin.ModelAdmin):
    list_display = ['employee', 'date', 'start_time', 'end_time', 'duration', 'project']
    list_filter = ['date', 'created_at']
    search_fields = ['employee__user__first_name', 'employee__user__last_name', 'project']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Entry Info', {
            'fields': ('employee', 'date', 'start_time', 'end_time')
        }),
        ('Details', {
            'fields': ('project', 'description')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['employee', 'type', 'title', 'read', 'created_at']
    list_filter = ['type', 'read', 'created_at']
    search_fields = ['employee__user__first_name', 'employee__user__last_name', 'title', 'message']
    readonly_fields = ['created_at']
    
    fieldsets = (
        ('Notification Info', {
            'fields': ('employee', 'type', 'title', 'message')
        }),
        ('Status', {
            'fields': ('read',)
        }),
        ('Timestamp', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['mark_as_read', 'mark_as_unread']
    
    def mark_as_read(self, request, queryset):
        queryset.update(read=True)
        self.message_user(request, f'{queryset.count()} notifications marked as read')
    mark_as_read.short_description = 'Mark selected as read'
    
    def mark_as_unread(self, request, queryset):
        queryset.update(read=False)
        self.message_user(request, f'{queryset.count()} notifications marked as unread')
    mark_as_unread.short_description = 'Mark selected as unread'