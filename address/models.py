from django.db import models


class Address(models.Model):
    street1 = models.CharField(blank=True, max_length=300)
    street2 = models.CharField(blank=False, max_length=300)
    houseNumber = models.CharField(blank=False, max_length=300)
    city = models.CharField(blank=False, max_length=300)
    psc = models.CharField(blank=False, max_length=30)

    def __str__(self):
        return self.street2
