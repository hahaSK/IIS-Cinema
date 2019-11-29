from django.shortcuts import render
from django.views.decorators.cache import never_cache
from requests import Response
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view

from .serializers import UserSerializer, UserSerializerWithToken
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response

UNAUTHORIZED_USER = {
    "error": "Unauthorized user"
}


def user_exception_response(e: Exception):
    """
    Specify error message
    :param e: exception
    :return: error response message
    """
    err_message = e.__str__()
    if e.__str__().__contains__("already exists"):
        if e.__str__().__contains__("email"):
            err_message = "User with this email already exists."
        if e.__str__().__contains__('username'):
            err_message = "User with this username already exists."

    return Response({"error": err_message}, status.HTTP_409_CONFLICT)


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    @never_cache
    def post(self, request):
        user = request.data['user']
        if not user:
            return Response({'response': 'error', 'message': 'No data found'})
        serializer = UserSerializerWithToken(data=user)
        if serializer.is_valid():
            saved_user = serializer.save()
        else:
            return Response({"response": "error", "message": serializer.errors})
        return Response({"response": "success", "message": "user created successfully"})


class PasswordEditView(APIView):

    @never_cache
    def put(self, request):
        user = request.user
        password = request.data['password']
        password_again = request.data['passwordAgain']

        if password == password_again:
            user.set_password(password)
            user.save()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "Passwords do not match!"}, status=status.HTTP_412_PRECONDITION_FAILED)


class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @never_cache
    def get(self, request):
        if request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        users = User.objects.all()

        user_serializer = UserSerializer(users, many=True)

        payload = {
            "user": user_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def put(self, request, user_id):

        user = User.objects.get(id=user_id)

        if not user:
            raise Exception("User doesn't exist")

        data = request.data
        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.username = data['username']
        user.email = data['email']
        user.role = data['role']
        user.date_of_birth = data['date_of_birth']

        try:
            user.save()
        except ValueError:
            return Response({
                "error": "REQUIRED_FIELD_NOT_FILLED"
            }, status=status.HTTP_412_PRECONDITION_FAILED)
        except Exception as e:
            return user_exception_response(e)

        user_serializer = UserSerializer(user)

        payload = {
            "status": "success",
            "user": user_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def delete(self, request, user_id):

        user = User.objects.get(id=user_id)
        user.delete()

        payload = {
            "status": "success",
        }

        return Response(payload, status=status.HTTP_200_OK)
