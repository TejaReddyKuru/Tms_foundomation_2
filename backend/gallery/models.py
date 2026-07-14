from django.db import models
from django.utils import timezone

class Gallery(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=100, blank=True)
    date = models.DateField(default=timezone.now)

    class Meta:
        verbose_name_plural = 'Galleries'
        ordering = ['-date']

    def __str__(self):
        return self.title
