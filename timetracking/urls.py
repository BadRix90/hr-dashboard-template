from django.urls import path
from .views import ProjectViewSet, TimeEntryViewSet

urlpatterns = [
    path('projects/', ProjectViewSet.as_view({'get': 'list', 'post': 'create'}), name='project-list'),
    path('projects/<int:pk>/', ProjectViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='project-detail'),
    path('time-entries/', TimeEntryViewSet.as_view({'get': 'list', 'post': 'create'}), name='timeentry-list'),
    path('time-entries/<int:pk>/', TimeEntryViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='timeentry-detail'),
]
