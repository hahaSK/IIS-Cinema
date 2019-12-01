from rest_framework import serializers
from .models import User
from rest_framework_jwt.settings import api_settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):

        if User.objects.filter(email=validated_data['email']).count() != 0:
            raise Exception("User with this email already exists.")

        if User.objects.filter(username=validated_data['username']).count() != 0:
            raise Exception("User with this username already exists.")

        user = User.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            role=validated_data['role'],
            password=validated_data['password'],
            date_of_birth=validated_data['date_of_birth'],
        )
        return user

    class Meta:
        model = User
        fields = ('token', 'username', 'email', 'role', 'date_of_birth', 'password', 'first_name', 'last_name')
