from rest_framework import serializers
from .models import Registration
from apps.events.models import Event

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'
        read_only_fields = ('user', 'payment_status', 'created_at')


    def validate(self, data):
        user = self.context['request'].user
        event = data['event']

        # Check if registration is open
        if not event.registration_open:
            raise serializers.ValidationError({"event": "Registrations for this event are currently closed."})

        # Check duplicate registration
        if Registration.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError("You have already registered for this event.")

        # Check capacity
        if Registration.objects.filter(event=event).count() >= event.capacity:
            raise serializers.ValidationError({"event": "This event has reached its maximum capacity."})

        return data
