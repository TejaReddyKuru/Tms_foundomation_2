import os
import sys

# Add the api directory to the Python path so it can find config and apps
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = get_wsgi_application()
