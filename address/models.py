from django.db import models
# For more info about django-countries see: https://github.com/SmileyChris/django-countries
from django_countries import fields
from django_countries import Countries


class EUCountries(Countries):
    only = [
        'AL', 'AD', 'AM', 'AT', 'BY', 'BE', 'BA', 'BG', 'CH', 'CY', 'CZ', 'DE',
        'DK', 'EE', 'ES', 'FO', 'FI', 'FR', 'GB', 'GE', 'GI', 'GR', 'HU', 'HR',
        'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MK', 'MT', 'NO', 'NL', 'PL',
        'PT', 'RO', 'RU', 'SE', 'SI', 'SK', 'SM', 'TR', 'UA', 'VA',
    ]


EU_countries = EUCountries()


class Address(models.Model):
    street1 = models.CharField(blank=True, max_length=300)
    street2 = models.CharField(blank=False, max_length=300, default="Unknown street")
    houseNumber = models.CharField(blank=False, max_length=300, default="Unknown number")
    city = models.CharField(blank=False, max_length=300, default="Unknown city")
    psc = models.CharField(blank=False, max_length=30, default="Unknown ZIP code")
    country = fields.CountryField(countries=EUCountries)

    class Meta:
        unique_together = ["street1", "street2", "houseNumber", "city", "psc", "country"]

    def __str__(self):
        return self.street2
