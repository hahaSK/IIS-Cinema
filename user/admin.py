from django.contrib import admin
from user.models import User

base_list_display = ('id', 'first_name', 'last_name', 'email')
extended_list = base_list_display + ('username', 'date_of_birth')


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'username', 'date_of_birth')
