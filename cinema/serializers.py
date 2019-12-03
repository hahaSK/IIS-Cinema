# todo/serializers.py

from rest_framework import serializers
from .models import Actor, Director, Genre, Hall, Act, Event, Reservation, Seat, SeatInEvent, ActType, File

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class ActTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActType
        fields = '__all__'

class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = '__all__'


class ActSerializer(serializers.ModelSerializer):
    class Meta:
        model = Act
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'


class SeatInEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeatInEvent
        fields = '__all__'
