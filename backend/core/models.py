from django.db import models

class Hero(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    banner_image = models.ImageField(upload_to='hero/')
    button_text = models.CharField(max_length=50, blank=True)
    button_link = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.title

class About(models.Model):
    heading = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='about/')

    def __str__(self):
        return self.heading

class Quote(models.Model):
    author = models.CharField(max_length=100)
    designation = models.CharField(max_length=100, blank=True)
    quote = models.TextField()
    image = models.ImageField(upload_to='quotes/', blank=True, null=True)

    def __str__(self):
        return f"Quote by {self.author}"

class Contact(models.Model):
    address = models.TextField()
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    facebook = models.URLField(blank=True)
    github = models.URLField(blank=True)
    youtube = models.URLField(blank=True)

    def __str__(self):
        return "Contact Details"
