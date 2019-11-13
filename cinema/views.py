from django.shortcuts import render
from django.views.decorators.cache import never_cache
from rest_framework import viewsets
from .serializers import ActorSerializer, DirectorSerializer, GenreSerializer, HallSerializer, \
  ActSerializer, EventSerializer, ReservationSerializer, SeatSerializer, ActTypeSerializer
from .models import Actor, Director, Genre, Hall, Act, Event, Reservation, Seat, SeatInEvent, ActType


class ActorView(viewsets.ModelViewSet):
  serializer_class = ActorSerializer
  queryset = Actor.objects.all()


class DirectorView(viewsets.ModelViewSet):
  serializer_class = DirectorSerializer
  queryset = Director.objects.all()


class GenreView(viewsets.ModelViewSet):
  serializer_class = GenreSerializer
  queryset = Genre.objects.all()

class ActTypeView(viewsets.ModelViewSet):
  serializer_class = ActTypeSerializer
  queryset = ActType.objects.all()

class HallView(viewsets.ModelViewSet):
  serializer_class = HallSerializer
  queryset = Hall.objects.all()


class ActView(viewsets.ModelViewSet):
  serializer_class = ActSerializer
  queryset = Act.objects.all()


class EventView(viewsets.ModelViewSet):
  serializer_class = EventSerializer
  queryset = Event.objects.all()


class ReservationView(viewsets.ModelViewSet):
  serializer_class = ReservationSerializer
  queryset = Reservation.objects.all()


class SeatView(viewsets.ModelViewSet):
  serializer_class = SeatSerializer
  queryset = Seat.objects.all()
