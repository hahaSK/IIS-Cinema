from django.db import models
from address.models import Address
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

from .base_user import AbstractUser


class User(AbstractUser):
    ADMIN = 1
    VIEWER = 2
    CASHIER = 3
    REDACTOR = 4

    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (VIEWER, 'Registered'),
        (CASHIER, 'Cashier'),
        (REDACTOR, 'Redactor')
    )

    date_of_birth = models.DateField(blank=True, default=None)

    role = models.SmallIntegerField(choices=ROLE_CHOICES, default=VIEWER)

    @staticmethod
    def create(username, email, role, password):
        return User.objects.create_user(username=username, email=email, password=password,
                                        role=role)

    def __str__(self):
        return super().get_full_name()
