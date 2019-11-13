# todo/serializers.py

from rest_framework import serializers
from .models import NotRegistered, Registered


class NotRegisteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotRegistered
        fields = '__all__'


class RegisteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registered
        fields = '__all__'