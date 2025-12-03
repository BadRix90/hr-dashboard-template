from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EmployeeViewSet,
    VacationRequestViewSet,
    TimeEntryViewSet,
    NotificationViewSet
)

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')
router.register(r'vacation-requests', VacationRequestViewSet, basename='vacation-request')
router.register(r'time-entries', TimeEntryViewSet, basename='time-entry')
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    path('', include(router.urls)),
]