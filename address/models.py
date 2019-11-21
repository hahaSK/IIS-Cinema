from django.db import models
# For more info about django-countries see: https://github.com/SmileyChris/django-countries
from django_countries import fields


class Address(models.Model):
    street1 = models.CharField(blank=True, max_length=300)
    street2 = models.CharField(blank=False, max_length=300, default="Unknown street")
    houseNumber = models.CharField(blank=False, max_length=300, default="Unknown number")
    city = models.CharField(blank=False, max_length=300, default="Unknown city")
    psc = models.CharField(blank=False, max_length=30, default="Unknown ZIP code")
    country = fields.CountryField()

    class Meta:
        unique_together = ["street1", "street2", "houseNumber", "city", "psc", "country"]

    def __str__(self):
        return self.street2

    # def __eq__(self, other):
    #     if not (isinstance(other, Address)):
    #         return False
    #     return (self.street2 == other.street2
    #             and self.street1 == other.street1
    #             and self.city == other.city
    #             and self.houseNumber == other.houseNumber
    #             and self.psc == other.psc
    #             and self.country == other.country)
