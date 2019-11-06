from django.db import models
from address.models import Address


class NotRegistered(models.Model):
    name = models.CharField(max_length=120, blank=False)
    surname = models.CharField(max_length=120, blank=False)
    email = models.EmailField()

    def __str__(self):
        return self.name + " " + self.surname


class Registered(NotRegistered):
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=False)

    def __str__(self):
        return self.name + " " + self.surname

class Cashier(Registered):
    pass


class Redactor(Registered):
    pass
