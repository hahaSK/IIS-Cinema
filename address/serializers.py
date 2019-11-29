# todo/serializers.py

from rest_framework import serializers
from .models import Address
from django_countries.serializers import CountryFieldMixin


class AddressSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
