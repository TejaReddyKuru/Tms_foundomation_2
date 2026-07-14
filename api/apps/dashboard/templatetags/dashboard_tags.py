from django import template
from apps.accounts.models import User
from apps.events.models import Event
from apps.registrations.models import Registration
from django.utils import timezone

register = template.Library()

@register.simple_tag
def get_dashboard_stats():
    today = timezone.now().date()
    this_month = today.replace(day=1)

    return {
        'total_users': User.objects.count(),
        'total_events': Event.objects.count(),
        'todays_registrations': Registration.objects.filter(created_at__date=today).count(),
        'monthly_registrations': Registration.objects.filter(created_at__date__gte=this_month).count(),
        'recent_users': User.objects.order_by('-created_at')[:5],
        'recent_registrations': Registration.objects.select_related('user', 'event').order_by('-created_at')[:5],
    }
