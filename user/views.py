from django.shortcuts import render
from rest_framework import viewsets
from .serializers import NotRegisteredSerializer, RegisteredSerializer
from .models import NotRegistered, Registered


class NotRegisteredView(viewsets.ModelViewSet):
  serializer_class = NotRegisteredSerializer
  queryset = NotRegistered.objects.all()


class RegisteredView(viewsets.ModelViewSet):
  serializer_class = RegisteredSerializer
  queryset = Registered.objects.all()
