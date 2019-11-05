from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RegisteredSerializer
from .models import Registered

class TRegisteredView(viewsets.ModelViewSet):
  serializer_class = RegisteredSerializer
  queryset = Registered.objects.all()
