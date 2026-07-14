from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'venue', 'capacity', 'registration_open', 'created_at')
    search_fields = ('title', 'venue')
    list_filter = ('registration_open', 'date')
    ordering = ('-date',)
    readonly_fields = ('created_at',)
    list_per_page = 20
