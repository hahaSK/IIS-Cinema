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
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
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
    path('events', cinemaviews.EventView.as_view()),
    path('acts', cinemaviews.ActView.as_view()),
    path('actors', cinemaviews.ActorView.as_view()),
    path('directors', cinemaviews.DirectorView.as_view()),
    path('genres', cinemaviews.GenreView.as_view()),
    path('acts/<uuid:act_id>', cinemaviews.ActView.as_view()),
    path('halls', cinemaviews.HallView.as_view()),

    path('users/', include('user.urls')),
    path('acttypes', cinemaviews.ActTypeView.as_view()),
    path('reservations', cinemaviews.ReservationView.as_view()),
]
