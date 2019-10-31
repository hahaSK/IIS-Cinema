from django.db import models
from address.models import AddressField


# repozitár adries https://pypi.org/project/django-address/


class NotRegistered(models.Model):
    name = models.CharField(max_length=120, blank=False)
    surname = models.CharField(max_length=120, blank=False)
    email = models.CharField(max_length=200, blank=False)


class Registered(NotRegistered):
    address = AddressField(on_delete=models.CASCADE)
