from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.cache import never_cache

from user.models import NotRegistered
from .serializers import ActorSerializer, DirectorSerializer, GenreSerializer, HallSerializer, \
    ActSerializer, EventSerializer, ReservationSerializer, SeatSerializer, ActTypeSerializer
from .models import Actor, Director, Genre, Hall, Act, Event, Reservation, Seat, SeatInEvent, ActType
from address.models import Address


class ActorView(APIView):
    @never_cache
    def get(self, request, actor_id=None):
        """
        Get Events
        :param request:
        :param actor_id:
        :return:
        """

        actors = Actor.objects.all()

        actor_serializer = ActorSerializer(actors, many=True)

        payload = {
            "actor": actor_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def post(self, request):
        data = request.data
        name = data['name']
        year = int(data['year'])
        # picture =

        new_actor = Actor.objects.create(name=name, year=year)

        actor_serializer = ActorSerializer(new_actor)

        payload = {
            "event": actor_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)


class DirectorView(APIView):
    @never_cache
    def get(self, request, director_id=None):
        """
        Get Events
        :param request:
        :param director_id:
        :return:
        """

        directors = Director.objects.all()

        director_serializer = DirectorSerializer(directors, many=True)

        payload = {
            "director": director_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def post(self, request):
        data = request.data
        name = data['name']
        year = int(data['year'])
        # picture =

        new_director = Director.objects.create(name=name, year=year)

        director_serializer = DirectorSerializer(new_director)

        payload = {
            "event": director_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)


class GenreView(APIView):
    @never_cache
    def get(self, request, genre_id=None):
        """
        Get Events
        :param request:
        :param genre_id:
        :return:
        """

        genres = Genre.objects.all()

        genre_serializer = GenreSerializer(genres, many=True)

        payload = {
            "genre": genre_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def post(self, request):
        data = request.data
        name = data['name']

        new_genre = Genre.objects.create(name=name)

        genre_serializer = GenreSerializer(new_genre)

        payload = {
            "event": genre_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)


class ActTypeView(APIView):

    @never_cache
    def get(self, request, act_type_id=None):
        """
        Get Act Types
        :param request:
        :param act_type_id:
        :return:
        """

        act_types = ActType.objects.all()

        act_type_serializer = ActTypeSerializer(act_types, many=True)

        payload = {
            "act_type": act_type_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def post(self, request):
        data = request.data
        name = data['name']

        new_act_type = ActType.objects.create(name=name)

        act_type_serializer = ActTypeSerializer(new_act_type)

        payload = {
            "event": act_type_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)


class HallView(APIView):
    @never_cache
    def get(self, request, hall_id=None):
        """
        Get Events
        :param request:
        :param hall_id:
        :return:
        """

        halls = Hall.objects.all()

        hall_serializer = HallSerializer(halls, many=True)

        payload = {
            "hall": hall_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def post(self, request):
        data = request.data
        name = data['name']
        address_id = int(data['address'])
        address = Address.objects.get(id=address_id)
        rows = int(data['rows'])
        columns = int(data['columns'])

        new_hall = Hall.objects.create(name=name, address=address, rows=rows, columns=columns)

        hall_serializer = HallSerializer(new_hall)

        payload = {
            "event": hall_serializer.data,
            "status": "success"
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
        act_type = ActType.objects.get(id=type_id)
        length = data['length']
        picture = data['picture']

        genre = []
        for current_element in data["genre"]:
            genre.append(Genre.objects.get(id=int(current_element)))

        cast = []
        for current_element in data["cast"]:
            cast.append(Actor.objects.get(id=int(current_element)))

        director = []
        for current_element in data["director"]:
            director.append(Director.objects.get(id=int(current_element)))

        rating = data['rating']
        description = data['description']

        new_act = Act.register_new_act(name=name, act_type=act_type, length=length, picture=picture, genre=genre, cast=cast,
                                       director=director, rating=rating, description=description)

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
        :param event_id:
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
        :param event_id:
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
        act = Act.objects.get(id=act_id)

        new_event = Event.objects.create(hall=hall, date=date, price=price, act=act)

        event_serializer = EventSerializer(new_event)

        payload = {
            "event": event_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)


class ReservationView(APIView):
    # serializer_class = ReservationSerializer
    # queryset = Reservation.objects.all()

    @never_cache
    def post(self, request):
        """
        Create New Act
        :param request:
        :return:
        """
        data = request.data
        user_id = int(data['user'])
        user = NotRegistered.objects.get(id=user_id)
        event_id = int(data['event'])
        event = Event.objects.get(id=event_id)
        paid = bool(data['paid'])

        seats = []
        for current_element in data["seats"]:
            seats.append(Seat.objects.get(id=int(current_element)))

        new_reservation = Reservation.register_new_reservation(user=user, event=event, paid=paid, seats=seats)

        reservation_serializer = ReservationSerializer(new_reservation)

        payload = {
          "act": reservation_serializer.data,
          "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def get(self, request, reservation_id=None):

        reservations = Reservation.objects.all()

        reservation_serializer = ReservationSerializer(reservations, many=True)

        payload = {
          "reservation": reservation_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)


class SeatView(APIView):
    serializer_class = SeatSerializer
    queryset = Seat.objects.all()
