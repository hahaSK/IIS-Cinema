# todo/serializers.py

from rest_framework import serializers
from .models import Registered


class RegisteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registered
        fields = '__all__'