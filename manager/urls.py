from django.urls import path
from . import views

urlpatterns = [
    path('team-overview/', views.team_overview, name='team-overview'),
    path('pending-requests/', views.pending_requests, name='pending-requests'),
    path('overtime-summary/', views.overtime_summary, name='overtime-summary'),
    path('export-csv/', views.ExportCSVView.as_view(), name='export-csv'),
]