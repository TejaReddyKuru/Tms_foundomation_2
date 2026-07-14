from django.db import models

class Program(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, blank=True) # e.g. for React Icons name
    description = models.TextField()
    image = models.ImageField(upload_to='programs/')
    status = models.CharField(max_length=50, default='Active')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
