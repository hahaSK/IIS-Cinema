from django.db import models
from address.models import AddressField


# repozitár adries https://pypi.org/project/django-address/


class NotRegistered(models.Model):
    name = models.TextField()
    surname = models.TextField()
    email = models.TextField()


class Registered(NotRegistered):
    address = AddressField(on_delete=models.CASCADE)
