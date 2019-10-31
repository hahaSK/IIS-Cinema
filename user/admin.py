from django.contrib import admin
from user.models import NotRegistered, Registered


@admin.register(NotRegistered)
class NotRegisteredAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'surname', 'email')


@admin.register(Registered)
class RegisteredAdmin(admin.ModelAdmin):
    list_display = ('id', 'address')
