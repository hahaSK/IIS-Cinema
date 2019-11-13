
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


class Cashier(Registered):
    class Meta:
        verbose_name = "Cashier"


class Redactor(Registered):
    class Meta:
        verbose_name = "Redactor"
