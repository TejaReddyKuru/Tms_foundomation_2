from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HomeAPIView, ProgramViewSet, GalleryViewSet, EventViewSet, ContactViewSet, RegisterView

router = DefaultRouter()
router.register(r'programs', ProgramViewSet, basename='program')
router.register(r'gallery', GalleryViewSet, basename='gallery')
router.register(r'events', EventViewSet, basename='event')
router.register(r'contact', ContactViewSet, basename='contact')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('home/', HomeAPIView.as_view(), name='home'),
    path('', include(router.urls)),
]
