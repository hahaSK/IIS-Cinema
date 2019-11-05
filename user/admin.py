from django.contrib import admin
from user.models import NotRegistered, Registered, Cashier, Redactor

base_list_display = ('id', 'name', 'surname', 'email')
extented_list = base_list_display + ('date_of_birth',)


@admin.register(NotRegistered)
class NotRegisteredAdmin(admin.ModelAdmin):
    list_display = base_list_display


@admin.register(Registered)
class RegisteredAdmin(admin.ModelAdmin):
    list_display = extented_list


@admin.register(Cashier)
class CashierAdmin(admin.ModelAdmin):
    list_display = extented_list


@admin.register(Redactor)
class RedactorAdmin(admin.ModelAdmin):
    list_display = extented_list
