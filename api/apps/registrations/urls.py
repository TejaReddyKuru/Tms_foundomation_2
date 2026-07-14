from django.urls import path
from .views import RegistrationCreateView, MyRegistrationsListView

urlpatterns = [
    path('register-event', RegistrationCreateView.as_view(), name='register-event'),
    path('my-registrations', MyRegistrationsListView.as_view(), name='my-registrations'),
]
