from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.cache import never_cache

from user.models import User
from .serializers import ActorSerializer, DirectorSerializer, GenreSerializer, HallSerializer, \
    ActSerializer, EventSerializer, ReservationSerializer, SeatSerializer, ActTypeSerializer
from .models import Actor, Director, Genre, Hall, Act, Event, Reservation, Seat, SeatInEvent, ActType
from address.models import Address

from user.models import User

UNAUTHORIZED_USER = {
    "error": "Unauthorized user"
}

TAKEN_SEAT = {
    "error": "Some of the selected seats is no available"
}


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
        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        data = request.data
        name = data['name']
        year = int(data['year'])
        picture = data['picture']

        new_actor = Actor.objects.create(name=name, year=year, picture=picture)

        actor_serializer = ActorSerializer(new_actor)

        payload = {
            "actor": actor_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def delete(self, request, actor_id):

        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        actor = Hall.objects.get(id=actor_id)
        actor.delete()

        payload = {
            "status": "success",
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
        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        data = request.data
        name = data['name']
        year = int(data['year'])
        picture = data['picture']

        new_director = Director.objects.create(name=name, year=year, picture=picture)

        director_serializer = DirectorSerializer(new_director)

        payload = {
            "director": director_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def delete(self, request, director_id):

        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        director = Hall.objects.get(id=director_id)
        director.delete()

        payload = {
            "status": "success",
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
        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        data = request.data
        name = data['name']

        new_genre = Genre.objects.create(name=name)

        genre_serializer = GenreSerializer(new_genre)

        payload = {
            "genre": genre_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def delete(self, request, genre_id):

        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        genre = Hall.objects.get(id=genre_id)
        genre.delete()

        payload = {
            "status": "success",
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
        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        data = request.data
        name = data['name']

        new_act_type = ActType.objects.create(name=name)

        act_type_serializer = ActTypeSerializer(new_act_type)

        payload = {
            "act_type": act_type_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def delete(self, request, act_type_id):

        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        act_type = Hall.objects.get(id=act_type_id)
        act_type.delete()

        payload = {
            "status": "success",
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
        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        data = request.data
        name = data['name']
        address_id = int(data['address'])
        address = Address.objects.get(id=address_id)
        rows = int(data['rows'])
        columns = int(data['columns'])

        new_hall = Hall.objects.create(name=name, address=address, rows=rows, columns=columns)

        hall_serializer = HallSerializer(new_hall)

        payload = {
            "hall": hall_serializer.data,
            "status": "success"
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def put(self, request, hall_id):

        permission_classes = [permissions.IsAuthenticated]
        # hall_id=1
        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        hall = Hall.objects.get(id=hall_id)

        if not hall:
            raise Exception("Event doesn't exist")

        try:
            data = request.data
            hall.name = data['name']
            address_id = int(data['address'])
            hall.address = Address.objects.get(id=address_id)
            hall.rows = int(data['rows'])
            hall.columns = int(data['columns'])

            hall.save()
        except ValueError:
            return Response({
                "error": "REQUIRED_FIELD_NOT_FILLED"
            }, status=status.HTTP_412_PRECONDITION_FAILED)
        except Exception as e:
            return e

        hall_serializer = HallSerializer(hall)

        payload = {
            "status": "success",
            "hall": hall_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def delete(self, request, hall_id):

        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        hall = Hall.objects.get(id=hall_id)
        hall.delete()

        payload = {
            "status": "success",
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
        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

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

        new_act = Act.register_new_act(name=name, act_type=act_type, length=length, picture=picture, genre=genre,
                                       cast=cast,
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
    def put(self, request, act_id):

        permission_classes = [permissions.IsAuthenticated]
        # act_id=1
        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        act = Event.objects.get(id=act_id)

        if not act:
            raise Exception("Act doesn't exist")

        try:
            data = request.data

            data = request.data
            act.name = data['name']
            type_id = int(data['type'])
            act.act_type = ActType.objects.get(id=type_id)
            act.length = data['length']
            act.picture = data['picture']

            act.genre.clear()
            for current_element in data["genre"]:
                act.genre.add(current_element)

            act.cast.clear()
            for current_element in data["cast"]:
                act.cast.add(current_element)

            act.director.clear()
            for current_element in data["director"]:
                act.director.add(current_element)

            act.rating = data['rating']
            act.description = data['description']

            act.save()
        except ValueError:
            return Response({
                "error": "REQUIRED_FIELD_NOT_FILLED"
            }, status=status.HTTP_412_PRECONDITION_FAILED)
        except Exception as e:
            return e

        act_serializer = ActSerializer(act)

        payload = {
            "status": "success",
            "act": act_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def delete(self, request, act_id):
        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

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
        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

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

    @never_cache
    def put(self, request, event_id):

        permission_classes = [permissions.IsAuthenticated]
        # event_id=1
        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        event = Event.objects.get(id=event_id)

        if not event:
            raise Exception("Event doesn't exist")

        try:
            data = request.data
            hall_id = int(data["hall"])
            event.hall = Hall.objects.get(id=hall_id)
            event.date = data["date"]
            event.price = data["price"]
            act_id = int(data["act"])
            event.act = Act.objects.get(id=act_id)

            event.save()
        except ValueError:
            return Response({
                "error": "REQUIRED_FIELD_NOT_FILLED"
            }, status=status.HTTP_412_PRECONDITION_FAILED)
        except Exception as e:
            return e

        event_serializer = EventSerializer(event)

        payload = {
            "status": "success",
            "event": event_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def delete(self, request, event_id):

        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        event = Event.objects.get(id=event_id)
        event.delete()

        payload = {
            "status": "success",
        }

        return Response(payload, status=status.HTTP_200_OK)


class ReservationView(APIView):
    # serializer_class = ReservationSerializer
    # queryset = Reservation.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET' or self.request.method == 'POST':
            return [permissions.AllowAny()]
        else:
            return [permissions.IsAuthenticated()]

    @never_cache
    def post(self, request):
        """
        Create New Act
        :param request:
        :return:
        """
        data = request.data
        user = data['user']
        event_id = int(data['event'])
        event = Event.objects.get(id=event_id)

        seats = []
        for current_element in data["seats"]:
            seats.append(Seat.objects.get(id=int(current_element)))

        new_reservation = Reservation.register_new_reservation(user=user, event=event, seats=seats)

        for current_item in new_reservation.seats.all():
            if not SeatInEvent.objects.get(event_id=new_reservation.event.id, seat_id=current_item).is_available:
                return Response(TAKEN_SEAT, status=status.HTTP_403_FORBIDDEN)

        reservation_serializer = ReservationSerializer(new_reservation)

        payload = {
            "reservation": reservation_serializer.data,
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

    @never_cache
    def put(self, request, reservation_id):

        permission_classes = [permissions.IsAuthenticated]
        # reservation_id=1
        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN and request.user.role != User.CASHIER:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        reservation = Reservation.objects.get(id=reservation_id)

        if not reservation:
            raise Exception("Reservation doesn't exist")

        try:
            data = request.data

            original_seats = []
            for seat in reservation.seats.all():
                original_seats.append(seat.id)
            diff_list = list(set(data['seats']) - set(original_seats))
            for current_item in diff_list:
                if not SeatInEvent.objects.get(event_id=reservation.event.id, seat_id=current_item).is_available:
                    reservation.save()
                    return Response(TAKEN_SEAT, status=status.HTTP_403_FORBIDDEN)

            reservation.user = data['user']
            event_id = int(data['event'])
            reservation.event = Event.objects.get(id=event_id)
            reservation.paid = bool(data['paid'])

            for current_element in reservation.seats.all():
                se = SeatInEvent.objects.get(event_id=event_id, seat_id=current_element)
                se.is_available = True
                se.save()

            reservation.seats.clear()
            for current_element in data["seats"]:
                reservation.seats.add(current_element)

            reservation.save()
        except ValueError:
            return Response({
                "error": "REQUIRED_FIELD_NOT_FILLED"
            }, status=status.HTTP_412_PRECONDITION_FAILED)
        except Exception as e:
            return e

        reservation_serializer = ReservationSerializer(reservation)

        payload = {
            "status": "success",
            "reservation": reservation_serializer.data,
        }

        return Response(payload, status=status.HTTP_200_OK)

    @never_cache
    def delete(self, request, reservation_id):

        permission_classes = [permissions.IsAuthenticated]

        if request.user.role != User.REDACTOR and request.user.role != User.ADMIN and request.user.role != User.CASHIER:
            return Response(UNAUTHORIZED_USER, status=status.HTTP_403_FORBIDDEN)

        reservation = Reservation.objects.get(id=reservation_id)
        reservation.delete()

        payload = {
            "status": "success",
        }

        return Response(payload, status=status.HTTP_200_OK)


class SeatView(APIView):
    serializer_class = SeatSerializer
    queryset = Seat.objects.all()
