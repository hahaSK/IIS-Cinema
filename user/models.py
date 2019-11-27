from django.db import models
from address.models import Address
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

from .base_user import AbstractUser


class User(AbstractUser):
    ADMIN = 1
    REGISTERED = 2
    CASHIER = 3
    REDACTOR = 4

    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (REGISTERED, 'Registered'),
        (CASHIER, 'Cashier'),
        (REDACTOR, 'Redactor')
    )

    date_of_birth = models.DateField(blank=False, default=timezone.now())

    role = models.SmallIntegerField(choices=ROLE_CHOICES, default=REGISTERED)

    @staticmethod
    def create(username, email, first_name, last_name, role, password, date_of_birth):
        if not first_name:
            raise ValueError("The first name must be set!")
        if not last_name:
            raise ValueError("The last name must be set!")

        if not date_of_birth:
            raise ValueError("The date of birth must be set!")

        return User.objects.create_user(username=username, email=email, password=password,
                                        first_name=first_name, last_name=last_name,
                                        date_of_birth=date_of_birth, role=role)

    def __str__(self):
        return super().get_full_name()
