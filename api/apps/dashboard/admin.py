from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.template.response import TemplateResponse
from apps.accounts.models import User
from apps.events.models import Event
from apps.registrations.models import Registration
from django.utils import timezone
from datetime import timedelta

class CustomAdminSite(admin.AdminSite):
    site_header = "CAiSMD Admin Portal"
    site_title = "CAiSMD Admin Portal"
    index_title = "Dashboard"

    def index(self, request, extra_context=None):
        today = timezone.now().date()
        this_month = today.replace(day=1)

        total_users = User.objects.count()
        total_events = Event.objects.count()
        
        todays_registrations = Registration.objects.filter(created_at__date=today).count()
        monthly_registrations = Registration.objects.filter(created_at__date__gte=this_month).count()
        
        recent_users = User.objects.order_by('-created_at')[:5]
        recent_registrations = Registration.objects.select_related('user', 'event').order_by('-created_at')[:5]

        extra_context = extra_context or {}
        extra_context.update({
            'total_users': total_users,
            'total_events': total_events,
            'todays_registrations': todays_registrations,
            'monthly_registrations': monthly_registrations,
            'recent_users': recent_users,
            'recent_registrations': recent_registrations,
        })
        return super().index(request, extra_context)

custom_admin_site = CustomAdminSite(name='custom_admin')
