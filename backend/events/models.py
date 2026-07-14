from django.db import models
from django.utils import timezone

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    banner = models.ImageField(upload_to='events/')
    date = models.DateField(default=timezone.now)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title
