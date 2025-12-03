from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    """Mitarbeiter-Stammdaten"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee')
    phone = models.CharField(max_length=20, blank=True)
    department = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    avatar = models.URLField(blank=True)
    vacation_days_total = models.IntegerField(default=30)
    vacation_days_used = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Mitarbeiter'
        verbose_name_plural = 'Mitarbeiter'

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    @property
    def vacation_days_available(self):
        return self.vacation_days_total - self.vacation_days_used


class VacationRequest(models.Model):
    """Urlaubsanträge"""
    STATUS_CHOICES = [
        ('pending', 'Ausstehend'),
        ('approved', 'Genehmigt'),
        ('rejected', 'Abgelehnt'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='vacation_requests')
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Urlaubsantrag'
        verbose_name_plural = 'Urlaubsanträge'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.employee} - {self.start_date} bis {self.end_date}"

    @property
    def days(self):
        return (self.end_date - self.start_date).days + 1


class TimeEntry(models.Model):
    """Zeiterfassung"""
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='time_entries')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    project = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Zeiteintrag'
        verbose_name_plural = 'Zeiteinträge'
        ordering = ['-date', '-start_time']

    def __str__(self):
        return f"{self.employee} - {self.date}"

    @property
    def duration(self):
        from datetime import datetime, timedelta
        start = datetime.combine(datetime.today(), self.start_time)
        end = datetime.combine(datetime.today(), self.end_time)
        delta = end - start
        return round(delta.total_seconds() / 3600, 2)


class Notification(models.Model):
    """Benachrichtigungen"""
    TYPE_CHOICES = [
        ('vacation', 'Urlaub'),
        ('time', 'Zeiterfassung'),
        ('team', 'Team'),
        ('system', 'System'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='notifications')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Benachrichtigung'
        verbose_name_plural = 'Benachrichtigungen'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.employee} - {self.title}"