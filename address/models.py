from django.db import models


class Address(models.Model):
    street1 = models.CharField(blank=True, max_length=300)
    street2 = models.CharField(blank=False, max_length=300, default="Unknown street")
    houseNumber = models.CharField(blank=False, max_length=300, default="Unknown number")
    city = models.CharField(blank=False, max_length=300, default="Unknown city")
    psc = models.CharField(blank=False, max_length=30, default="Unknown ZIP code")

    class Meta:
        unique_together = ["street1", "street2", "houseNumber", "city", "psc"]

    def __str__(self):
        return self.street2

    def __eq__(self, other):
        if not (isinstance(other, Address)):
            return False
        return (self.street2 == other.street2
                and self.street1 == other.street1
                and self.city == other.city
                and self.houseNumber == other.houseNumber
                and self.psc == other.psc)
