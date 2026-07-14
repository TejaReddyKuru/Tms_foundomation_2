from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Creates a default superuser if it does not exist'

    def handle(self, *args, **options):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin@123')
            self.stdout.write(self.style.SUCCESS('Successfully created default superuser "admin"'))
        else:
            self.stdout.write(self.style.WARNING('Superuser "admin" already exists'))
