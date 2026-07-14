from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from events.models import EventRegistration
from core.models import Hero, About, Quote, Contact
from programs.models import Program
from gallery.models import Gallery
from events.models import Event
from .serializers import (
    HeroSerializer, AboutSerializer, QuoteSerializer, ContactSerializer,
    ProgramSerializer, GallerySerializer, EventSerializer, RegisterSerializer
)

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def register(self, request, pk=None):
        event = self.get_object()
        user = request.user
        reg, created = EventRegistration.objects.get_or_create(user=user, event=event)
        if created:
            return Response({'message': 'Successfully registered for event.'}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Already registered.'}, status=status.HTTP_200_OK)

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
