from django.contrib import admin
from django.contrib.auth.forms import UserCreationForm

from user.models import User

base_list_display = ('id', 'first_name', 'last_name', 'email')
extended_list = base_list_display + ('username', 'date_of_birth')


class CustomUserCreationForm(UserCreationForm):
    """
    User creation form only with required fields and passwords.
    """

    class Meta:
        model = User
        fields = [item for item in extended_list if item != 'id']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in extended_list:
            if field != 'id':
                self.fields[field].required = True


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = extended_list
    form = CustomUserCreationForm
