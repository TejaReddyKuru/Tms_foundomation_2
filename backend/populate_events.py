import os
import django
from datetime import datetime

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from events.models import Event
from django.core.files.base import ContentFile
import urllib.request

def create_event(id, title, date, description, banner_url):
    try:
        # Check if event already exists
        if Event.objects.filter(id=id).exists():
            print(f"Event {id} already exists")
            return
            
        print(f"Downloading image for {title}...")
        req = urllib.request.Request(banner_url, headers={'User-Agent': 'Mozilla/5.0'})
        image_content = urllib.request.urlopen(req).read()
        
        event = Event(id=id, title=title, description=description, date=date)
        event.banner.save(f"event_{id}.jpg", ContentFile(image_content), save=True)
        print(f"Created event: {title}")
    except Exception as e:
        print(f"Error creating event {title}: {e}")

if __name__ == "__main__":
    create_event(
        id=1,
        title="Annual Youth Summit",
        date="2026-08-15",
        description="Join youth leaders across India for a day of inspiration, networking, and planning for rural development.",
        banner_url="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
    )
    
    create_event(
        id=2,
        title="Rural Tech Expo",
        date="2026-09-10",
        description="Showcasing innovations in rural technology, clean energy, and sustainable agriculture techniques.",
        banner_url="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"
    )
