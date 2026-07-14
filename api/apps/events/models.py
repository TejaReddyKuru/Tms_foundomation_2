from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateTimeField()
    venue = models.CharField(max_length=255)
    capacity = models.PositiveIntegerField(default=100)
    registration_open = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
