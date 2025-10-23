from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import register, logout

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api/auth/register/', register, name='register'),
    path('api/auth/logout/', logout, name='logout'),
    path('api/password-reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/', include('timetracking.urls')),
    path('api/', include('vacation.urls')),
]
