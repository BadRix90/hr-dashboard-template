from django.db import models
from django.contrib.auth.models import User

class VacationRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Ausstehend'),
        ('approved', 'Genehmigt'),
        ('rejected', 'Abgelehnt'),
    ]
    
    TYPE_CHOICES = [
        ('urlaub', 'Urlaub'),
        ('krank', 'Krankheit'),
        ('sonderurlaub', 'Sonderurlaub'),
    ]
    
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vacation_requests')
    start_date = models.DateField()
    end_date = models.DateField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='urlaub')
    days = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reason = models.TextField(blank=True)
    rejection_reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.employee.username} - {self.start_date} bis {self.end_date}"