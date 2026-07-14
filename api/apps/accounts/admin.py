from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'role', 'is_staff', 'created_at')
    search_fields = ('name', 'email', 'phone')
    list_filter = ('role', 'is_staff', 'is_superuser')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    list_per_page = 20
