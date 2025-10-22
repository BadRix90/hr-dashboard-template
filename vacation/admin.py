from django.contrib import admin
from .models import VacationRequest

@admin.register(VacationRequest)
class VacationRequestAdmin(admin.ModelAdmin):
    list_display = ['employee', 'start_date', 'end_date', 'days', 'type', 'status', 'created_at']
    list_filter = ['status', 'type', 'start_date']
    search_fields = ['employee__username', 'reason']
    readonly_fields = ['created_at', 'updated_at']