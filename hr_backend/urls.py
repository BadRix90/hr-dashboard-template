from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('timetracking.urls')),
    path('api/vacation/', include('vacation.urls')),
    path('api/users/', include('users.urls')),
    path('api/manager/', include('manager.urls')),
]