from django.contrib import admin
from .models import Address


@admin.register(Address)
class Address(admin.ModelAdmin):
    list_display = ('id', 'street1', 'street2', 'houseNumber', 'city', 'psc', 'country')
