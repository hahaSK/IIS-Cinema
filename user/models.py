from django.db import models
from enum import Enum
from address.models import AddressField


# repozitár adries https://pypi.org/project/django-address/

class Type(Enum):
    NOT_REGISTERED = 0
    REGISTERED = 1
    CASHIER = 2
    REDACTOR = 3


class NotRegistered(models.Model):
    name = models.CharField(max_length=120, blank=False)
    surname = models.CharField(max_length=120, blank=False)
    email = models.EmailField()
    type = Type.NOT_REGISTERED


class Registered(NotRegistered):
    type = Type.REGISTERED
    # TODO address
    # address = AddressField(on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=False)


class Cashier(Registered):
    type = Type.CASHIER
    # TODO
    pass


class Redactor(Registered):
    type = Type.REDACTOR
    # TODO
    pass
