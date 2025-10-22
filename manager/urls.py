from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamOverviewViewSet, OvertimeViewSet, ExportCSVView

router = DefaultRouter()
router.register('team', TeamOverviewViewSet, basename='team')
router.register('overtime', OvertimeViewSet, basename='overtime')

urlpatterns = [
    path('', include(router.urls)),
    path('export/csv/', ExportCSVView.as_view(), name='export-csv'),
]