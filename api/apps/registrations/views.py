from rest_framework import generics, permissions
from .models import Registration
from .serializers import RegistrationSerializer

class RegistrationCreateView(generics.CreateAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MyRegistrationsListView(generics.ListAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Registration.objects.filter(user=self.request.user).order_by('-created_at')
