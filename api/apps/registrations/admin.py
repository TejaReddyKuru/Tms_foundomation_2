import csv
from django.http import HttpResponse
from django.contrib import admin
from .models import Registration

@admin.action(description="Export Selected Registrations to CSV")
def export_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="registrations.csv"'
    writer = csv.writer(response)
    
    writer.writerow([
        'Event', 'Full Name', 'Email', 'Phone', 'University', 
        'Department', 'Year', 'Registration Number', 'Gender', 'Payment Status', 'Created At'
    ])
    
    for obj in queryset:
        writer.writerow([
            obj.event.title, obj.full_name, obj.email, obj.phone, obj.university,
            obj.department, obj.year, obj.registration_number, obj.gender, obj.payment_status, obj.created_at
        ])
    return response

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'event', 'email', 'phone', 'payment_status', 'created_at')
    search_fields = ('full_name', 'email', 'phone', 'registration_number', 'event__title')
    list_filter = ('event', 'payment_status', 'gender', 'year', 'created_at')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)
    list_per_page = 20
    actions = [export_to_csv]
