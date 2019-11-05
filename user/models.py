from django.db import models


class NotRegistered(models.Model):
    name = models.CharField(max_length=120, blank=False)
    surname = models.CharField(max_length=120, blank=False)
    email = models.EmailField()


class Registered(NotRegistered):
    # TODO address
    # address = AddressField(on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=False)


class Cashier(Registered):
    # TODO
    pass


class Redactor(Registered):
    # TODO
    pass
