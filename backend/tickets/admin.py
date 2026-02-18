from django.contrib import admin
from .models import Ticket

# Register your models here.

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "priority", "status", "created_at")
    list_filter = ("category", "priority", "status")
    search_fields = ("title", "description")