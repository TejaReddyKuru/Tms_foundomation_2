from rest_framework import generics, permissions
from .models import Event
from .serializers import EventSerializer

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.role == 'Admin')

class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all().order_by('-created_at')
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]

class EventRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]
