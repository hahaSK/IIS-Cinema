from django.contrib import admin
from user.models import NotRegistered, Registered, Cashier, Redactor
from django.contrib.auth.forms import UserCreationForm
from address.models import Address

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

    def save_model(self, request, obj, form, change):
        email = request.POST.get("email")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        NotRegistered.objects.create_user(email=email, first_name=first_name, last_name=last_name)


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

    def save_model(self, request, obj, form, change):
        email = request.POST.get("email")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        username = request.POST.get("username")
        address = Address.objects.get(pk=request.POST.get("address"))
        date_of_birth = request.POST.get("date_of_birth")
        password = request.POST.get("password2")
        Registered.objects.create_user_with_username(email=email, first_name=first_name, last_name=last_name,
                                                     username=username, address=address, date_of_birth=date_of_birth,
                                                     password=password)


@admin.register(Cashier)
class CashierAdmin(admin.ModelAdmin):
    form = RegisteredUserCreationForm
    list_display = extended_list

    def save_model(self, request, obj, form, change):
        email = request.POST.get("email")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        username = request.POST.get("username")
        address = Address.objects.get(pk=request.POST.get("address"))
        date_of_birth = request.POST.get("date_of_birth")
        password = request.POST.get("password2")
        Cashier.objects.create_user_with_username(email=email, first_name=first_name, last_name=last_name,
                                                  username=username, address=address, date_of_birth=date_of_birth,
                                                  password=password)


@admin.register(Redactor)
class RedactorAdmin(admin.ModelAdmin):
    form = RegisteredUserCreationForm
    list_display = extended_list

    def save_model(self, request, obj, form, change):
        email = request.POST.get("email")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        username = request.POST.get("username")
        address = Address.objects.get(pk=request.POST.get("address"))
        date_of_birth = request.POST.get("date_of_birth")
        password = request.POST.get("password2")
        Redactor.objects.create_user_with_username(email=email, first_name=first_name, last_name=last_name,
                                                   username=username, address=address, date_of_birth=date_of_birth,
                                                   password=password)
