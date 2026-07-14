from django.db import models
from django.core.validators import FileExtensionValidator
from apps.accounts.models import User
from apps.events.models import Event

class Registration(models.Model):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    )

    PAYMENT_CHOICES = (
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Failed', 'Failed'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='registrations')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
    university = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    year = models.CharField(max_length=50)
    registration_number = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    
    resume = models.FileField(
        upload_to='resumes/', 
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx'])]
    )
    
    payment_status = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'event')

    def __str__(self):
        return f"{self.full_name} - {self.event.title}"
