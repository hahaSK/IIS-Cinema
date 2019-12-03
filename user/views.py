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
            err_message = "Uživatel s daným email již existuje."
        if e.__str__().__contains__('username'):
            err_message = "Uživatel s daným užívatelským jménem již existuje."

    return Response({"error": err_message}, status.HTTP_409_CONFLICT)


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserRegisterView(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    @never_cache
    def post(self, request):
        print("------------------------")
        print(request.data)
        print("------------------------")
        user = request.data
        if not user:
            return Response({'response': 'error', 'message': 'No data found'})

        if User.objects.filter(email=user['email']).count() != 0:
            return Response({"response": "error", "message": "Uživatel s daným emailem již existuje."})

        if User.objects.filter(username=user['username']).count() != 0:
            return Response({"response": "error", "message": "Uživatel s daným užívatelským jménem již existuje."})

        serializer = UserSerializerWithToken(data=user)
        if serializer.is_valid():
            saved_user = serializer.save()
        else:
            return Response({"response": "error", "message": serializer.errors})
        return Response({"response": "success", "user": serializer.data})


class PasswordEditView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @never_cache
    def put(self, request, user_id):
        user = User.objects.get(id=user_id)
        password = request.data['password']
        password_again = request.data['password_again']

        if password == password_again:
            user.set_password(password)
            user.save()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "Hesla se neshodují!"}, status=status.HTTP_412_PRECONDITION_FAILED)


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
            return Response({"error": "Uživatel neexistuje."})

        data = request.data
        try:
            user.first_name = data['first_name']
            user.last_name = data['last_name']
            user.username = data['username']
            user.email = data['email']
        except Exception:
            pass

        try:
            user.role = data['role']
        except Exception:
            pass

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
