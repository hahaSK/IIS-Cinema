from django.contrib import admin
from user.models import NotRegistered, Registered, Cashier, Redactor
from address.models import Address

base_list_display = ('id', 'name', 'surname', 'email')
extended_list = base_list_display + ('date_of_birth',)


@admin.register(Address)
class Address(admin.ModelAdmin):
    list_display = ('id', 'street1', 'street2', 'houseNumber', 'city', 'psc')


@admin.register(NotRegistered)
class NotRegisteredAdmin(admin.ModelAdmin):
    list_display = base_list_display


@admin.register(Registered)
class RegisteredAdmin(admin.ModelAdmin):
    list_display = extended_list


@admin.register(Cashier)
class CashierAdmin(admin.ModelAdmin):
    list_display = extended_list


@admin.register(Redactor)
class RedactorAdmin(admin.ModelAdmin):
    list_display = extended_list
