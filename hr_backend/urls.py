from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import UserViewSet, register, logout

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api/auth/register/', register, name='register'),
    path('api/auth/logout/', logout, name='logout'),
    path('api/password-reset/', include('django_rest_passwordreset.urls')),
    path('api/timetracking/', include('timetracking.urls')),
    path('api/vacation/', include('vacation.urls')),
    path('api/manager/', include('manager.urls')),
]