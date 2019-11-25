from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.cache import never_cache
from .serializers import ActorSerializer, DirectorSerializer, GenreSerializer, HallSerializer, \
  ActSerializer, EventSerializer, ReservationSerializer, SeatSerializer, ActTypeSerializer
from .models import Actor, Director, Genre, Hall, Act, Event, Reservation, Seat, SeatInEvent, ActType


class ActorView(APIView):
  serializer_class = ActorSerializer
  queryset = Actor.objects.all()


class DirectorView(APIView):
  serializer_class = DirectorSerializer
  queryset = Director.objects.all()


class GenreView(APIView):
  serializer_class = GenreSerializer
  queryset = Genre.objects.all()

class ActTypeView(APIView):

  @never_cache
  def get(self, request, act_type_id=None):
    """
    Get Act Types
    :param request:
    :param area_id:
    :return:
    """

    act_types = ActType.objects.all()

    act_type_serializer = ActTypeSerializer(act_types, many=True)

    payload = {
      "act_type": act_type_serializer.data,
    }

    return Response(payload, status=status.HTTP_200_OK)


class HallView(APIView):
  @never_cache
  def get(self, request, hall_id=None):
    """
    Get Events
    :param request:
    :param area_id:
    :return:
    """

    halls = Hall.objects.all()

    hall_serializer = HallSerializer(halls, many=True)

    payload = {
      "hall": hall_serializer.data,
    }

    return Response(payload, status=status.HTTP_200_OK)


class ActView(APIView):
  @never_cache
  def post(self, request):
    """
    Create New Act
    :param request:
    :return:
    """
    data = request.data
    name = data['name']
    type_id = int(data['type'])
    type = ActType.objects.get(id=type_id)
    length = data['length']
    # picture = data['picture']
    genre_id = int(data['genre'])
    genre = Genre.objects.get(id=genre_id)
    cast_id = int(data['cast'])
    cast = Actor.objects.get(id=cast_id)
    director_id = int(data['director'])
    director = Director.objects.get(id=director_id)
    rating = data['rating']
    description = data['description']

    new_act = Act.register_new_act(name=name, type=type, length=length, genre=genre, cast=cast, director=director, rating=rating, description=description)

    act_serializer = ActSerializer(new_act)

    payload = {
      "act": act_serializer.data,
      "status": "success"
    }

    return Response(payload, status=status.HTTP_200_OK)

  @never_cache
  def get(self, request, act_id=None):

    acts = Act.objects.all()

    act_serializer = ActSerializer(acts, many=True)

    payload = {
      "act": act_serializer.data,
    }

    return Response(payload, status=status.HTTP_200_OK)

  @never_cache
  def delete(self, request, act_id):

    act = Act.objects.get(id=act_id)
    act.delete()

    payload = {
      "status": "success",
    }

    return Response(payload, status=status.HTTP_200_OK)



class EventView(APIView):
  """
  Real working example
  """
  payload = {
    "subject": "event"
  }

  ERROR_PAYLOAD = {
    "error": "Event does not exists"
  }

  @staticmethod
  def get_event(event_id):
    """
    Get event from database
    :param area_id:
    :return:
    """
    try:
      event = Event.objects.get(id=event_id)
      return event
    except Event.DoesNotExist:
      return None

  @never_cache
  def get(self, request, event_id=None):
    """
    Get Events
    :param request:
    :param area_id:
    :return:
    """

    events = Event.objects.all()

    event_serializer = EventSerializer(events, many=True)

    payload = {
      "event": event_serializer.data,
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
    hall_id = int(data["hall"])
    hall = Hall.objects.get(id=hall_id)
    date = data["date"]
    price = data["price"]
    act_id = int(data["act"])
    act = Hall.objects.get(id=act_id)

    new_event = Event.objects.create(hall=hall, date=date, price=price, act=act)

    event_serializer = ActSerializer(new_event)

    payload = {
      "event": event_serializer.data,
      "status": "success"
    }

    return Response(payload, status=status.HTTP_200_OK)


class ReservationView(APIView):
  serializer_class = ReservationSerializer
  queryset = Reservation.objects.all()


class SeatView(APIView):
  serializer_class = SeatSerializer
  queryset = Seat.objects.all()