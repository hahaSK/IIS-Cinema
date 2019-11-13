from django.shortcuts import render
from django.views.decorators.cache import never_cache
from rest_framework import viewsets
from .serializers import AddressSerializer
from .models import Address


class AddressView(viewsets.ModelViewSet):
  serializer_class = AddressSerializer
  queryset = Address.objects.all()
