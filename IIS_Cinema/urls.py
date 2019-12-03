"""IIS_Cinema URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import verify_jwt_token, obtain_jwt_token

from address import views as addressviews
from user import views as userviews
from cinema import views as cinemaviews

# router = routers.DefaultRouter()
# router.register(r'actors', cinemaviews.ActorView, 'actor')
# router.register(r'directors', cinemaviews.DirectorView, 'director')
# router.register(r'genres', cinemaviews.GenreView, 'genre')
# router.register(r'actTypes', cinemaviews.ActTypeView, 'actType')
# router.register(r'halls', cinemaviews.HallView, 'hall')
# router.register(r'acts', cinemaviews.ActView, 'act')
# router.register(r'events', cinemaviews.EventView, 'event')
# router.register(r'reservations', cinemaviews.ReservationView, 'reservation')
# router.register(r'seats', cinemaviews.SeatView, 'seat')
# router.register(r'addresses', addressviews.AddressView, 'address')
# router.register(r'notRegisteredUsers', userviews.NotRegisteredView, 'notRegisteredUser')
# router.register(r'registeredUsers', userviews.RegisteredView, 'registeredUser')

app_name = 'api'

urlpatterns = [
    path('admin/', admin.site.urls),

    path('event', cinemaviews.EventView.as_view()),
    path('events', cinemaviews.OpenEventView.as_view()),
    path('event/<uuid:event_id>', cinemaviews.EventView.as_view()),
    path('act', cinemaviews.ActView.as_view()),
    path('acts', cinemaviews.OpenActView.as_view()),
    path('act/<uuid:act_id>', cinemaviews.ActView.as_view()),
    path('actor', cinemaviews.ActorView.as_view()),
    path('actors', cinemaviews.OpenActorView.as_view()),
    path('actor/<uuid:actor_id>', cinemaviews.ActorView.as_view()),
    path('director', cinemaviews.DirectorView.as_view()),
    path('directors', cinemaviews.OpenDirectorView.as_view()),
    path('director/<uuid:director_id>', cinemaviews.DirectorView.as_view()),
    path('genre', cinemaviews.GenreView.as_view()),
    path('genres', cinemaviews.OpenGenreView.as_view()),
    path('genre/<uuid:genre_id>', cinemaviews.GenreView.as_view()),
    path('addresses', addressviews.OpenAddressesView.as_view()),
    path('address', addressviews.AddressView.as_view()),
    # path('countries', addressviews.countries_view),
    path('hall', cinemaviews.HallView.as_view()),
    path('halls', cinemaviews.OpenHallView.as_view()),
    path('hall/<uuid:hall_id>', cinemaviews.HallView.as_view()),
    path('acttype', cinemaviews.ActTypeView.as_view()),
    path('acttypes', cinemaviews.OpenActTypeView.as_view()),
    path('acttype/<uuid:type_id>', cinemaviews.ActTypeView.as_view()),
    path('reservation', cinemaviews.ReservationView.as_view()),
    path('reservations', cinemaviews.OpenReservationView.as_view()),
    path('reservation/<uuid:reservation_id>', cinemaviews.ReservationView.as_view()),
    path('seats', cinemaviews.SeatView.as_view()),
    path('seats/<uuid:seat_id>', cinemaviews.SeatView.as_view()),
    path('seats-in-event', cinemaviews.SeatInEventView.as_view()),
    path('seats-in-event/<uuid:event_id>', cinemaviews.SeatInEventView.as_view()),
    path('upload', cinemaviews.FileUploadView.as_view()),

    # user views
    path('current_user', userviews.current_user),
    path('login', obtain_jwt_token),
    path('api-token-verify', verify_jwt_token),
    path('user/create', userviews.UserRegisterView.as_view()),
    path('users', userviews.UserView.as_view()),
    path('user/<uuid:user_id>', userviews.UserView.as_view()),
    path('user/<uuid:user_id>/password', userviews.PasswordEditView.as_view())
] + static(settings.MEDIA_URL,
           document_root=settings.MEDIA_ROOT)
