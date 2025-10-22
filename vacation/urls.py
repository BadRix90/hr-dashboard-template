from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VacationRequestViewSet, VacationBalanceViewSet

router = DefaultRouter()
router.register('requests', VacationRequestViewSet)
router.register('balance', VacationBalanceViewSet, basename='vacation-balance')

urlpatterns = [
    path('', include(router.urls)),
]