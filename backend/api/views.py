from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from core.models import Hero, About, Quote, Contact
from programs.models import Program
from gallery.models import Gallery
from events.models import Event
from .serializers import (
    HeroSerializer, AboutSerializer, QuoteSerializer, ContactSerializer,
    ProgramSerializer, GallerySerializer, EventSerializer
)

class HomeAPIView(APIView):
    def get(self, request, *args, **kwargs):
        hero = Hero.objects.first()
        about = About.objects.first()
        quotes = Quote.objects.all()
        programs = Program.objects.all()
        events = Event.objects.all()

        return Response({
            "hero": HeroSerializer(hero, context={'request': request}).data if hero else None,
            "about": AboutSerializer(about, context={'request': request}).data if about else None,
            "quotes": QuoteSerializer(quotes, many=True, context={'request': request}).data,
            "programs": ProgramSerializer(programs, many=True, context={'request': request}).data,
            "events": EventSerializer(events, many=True, context={'request': request}).data,
        })

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    lookup_field = 'slug'

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
