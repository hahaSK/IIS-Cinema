from django.shortcuts import render
from django.views.decorators.cache import never_cache
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AddressSerializer
from .models import Address


class AddressView(APIView):
    # serializer_class = AddressSerializer
    # queryset = Address.objects.all()

    @never_cache
    def get(self, request, address_id=None):
        """
        Get Events
        :param request:
        :param address_id:
        :return:
        """

        addresses = Address.objects.all()

        address_serializer = AddressSerializer(addresses, many=True)

        payload = {
            "event": address_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def post(self, request):
        """
        Create New Act
        :param request:
        :return:
        """
        data = request.data
        if data["street1"]:
          street1 = data["street1"]
        else:
          street1 = ""
        street2 = data["street2"]
        houseNumber = data["houseNumber"]
        city = data["city"]
        psc = data["psc"]
        country = data["country"]

        new_address = Address.objects.create(street1=street1, street2=street2, houseNumber=houseNumber, city=city,
                                             psc=psc, country=country)

        address_serializer = AddressSerializer(new_address)

        payload = {
            "event": address_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)