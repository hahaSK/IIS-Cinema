from django.shortcuts import render
from django.views.decorators.cache import never_cache
from rest_framework import status, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from user.models import User
from .serializers import AddressSerializer
from .models import Address

# EU_countries

UNAUTHORIZED_USER = {
    "error": "Unauthorized user"
}


# @api_view(['GET'])
# def countries_view(request):
#     return Response(EU_countries.countries, status=status.HTTP_200_OK)


class OpenAddressesView(APIView):
    permission_classes = []
    authentication_classes = []

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
            "address": address_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)


class AddressView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @never_cache
    def post(self, request):
        """
        Create New Act
        :param request:
        :return:
        """
        data = request.data
        print(data)
        street2 = data["street2"]
        houseNumber = data["house_number"]
        city = data["city"]
        psc = data["psc"]
        # country = data["country"]

        new_address = Address.objects.create(street2=street2, houseNumber=houseNumber, city=city, psc=psc)

        address_serializer = AddressSerializer(new_address)

        payload = {
            "address": address_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def put(self, request, address_id):

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        address = Address.objects.get(id=address_id)

        if not address:
            raise Exception("Address doesn't exist")

        try:
            data = request.data
            if data["street1"]:
                address.street1 = data["street1"]
            else:
                address.street1 = ""
            address.street2 = data["street2"]
            address.houseNumber = data["houseNumber"]
            address.city = data["city"]
            address.psc = data["psc"]
            # address.country = data["country"]

            address.save()
        except ValueError:
            return Response({
                "error": "REQUIRED_FIELD_NOT_FILLED"
            }, status=status.HTTP_412_PRECONDITION_FAILED)
        except Exception as e:
            return e

        address_serializer = AddressSerializer(address)

        payload = {
            "status": "success",
            "hall": address_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def delete(self, request, address_id):

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        address = Address.objects.get(id=address_id)
        address.delete()

        payload = {
            "status": "success",
        }

        return Response(payload, status=status.HTTP_200_OK)
