from django.db import models
from address.models import Address
from django.contrib.auth.models import AbstractUser

from .base_user import AbstractUser

USER_PERMISSIONS = [
    ()
]


class User(AbstractUser):
    pass


class NotRegistered(User):
    has_username = False
    # user_permissions = None
    password = None
    REQUIRED_FIELDS = ('first_name', 'last_name', 'email')

    class Meta:
        verbose_name = "Not Registered"

    def __str__(self):
        return self.first_name + " " + self.last_name


class Registered(User):
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=False)
    REQUIRED_FIELDS = ('username', 'first_name', 'last_name', 'email', 'address', 'date_of_birth')

    class Meta:
        verbose_name = "Registered"

    def __str__(self):
        return self.first_name + " " + self.last_name

    def save(self, *args, **kwargs):
        user = User.objects.filter(email=self.email)
        # if the user with the email doesn't exists then save (we are creating new user and the save was called by
        # create_user_with_username).
        # OR
        # if we are not changing the username then save/update
        if not user or user.first().username == self.username:
            super().save()
            return

        # Now we know that the user exist and is changing username so we need to check if some other user with the same
        # username exists.
        if len(list(User.objects.filter(username=self.username))) > 0:
            raise Exception("Username already exists")

        super().save()


class Cashier(Registered):
    class Meta:
        verbose_name = "Cashier"


class Redactor(Registered):
    class Meta:
        verbose_name = "Redactor"
