from django.contrib import admin
from user.models import NotRegistered, Registered, Cashier, Redactor
from django.contrib.auth.forms import UserCreationForm

base_list_display = ('id', 'first_name', 'last_name', 'email')
extended_list = base_list_display + ('username', 'date_of_birth')


class NotRegisteredUserCreationForm(UserCreationForm):
    """
    User creation form only with required fields and without passwords.
    """

    class Meta:
        model = NotRegistered
        fields = NotRegistered.REQUIRED_FIELDS

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].required = False
        self.fields['password2'].required = False
        for req_field in NotRegistered.REQUIRED_FIELDS:
            self.fields[req_field].required = True


@admin.register(NotRegistered)
class NotRegisteredAdmin(admin.ModelAdmin):
    form = NotRegisteredUserCreationForm
    list_display = base_list_display
    fieldsets = ((None, {'fields': NotRegistered.REQUIRED_FIELDS}),)


class RegisteredUserCreationForm(UserCreationForm):
    """
    User creation form only with required fields and passwords.
    """

    class Meta:
        fields = Registered.REQUIRED_FIELDS

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for req_field in NotRegistered.REQUIRED_FIELDS:
            self.fields[req_field].required = True


@admin.register(Registered)
class RegisteredAdmin(admin.ModelAdmin):
    form = RegisteredUserCreationForm
    list_display = extended_list


@admin.register(Cashier)
class CashierAdmin(admin.ModelAdmin):
    form = RegisteredUserCreationForm
    list_display = extended_list


@admin.register(Redactor)
class RedactorAdmin(admin.ModelAdmin):
    form = RegisteredUserCreationForm
    list_display = extended_list
