from django.db import models

# Create your models here.
from address.models import AddressField
from user.models import NotRegistered


class Hall(models.Model):
    address = AddressField(on_delete=models.CASCADE)
    seats_count = models.PositiveSmallIntegerField()
    # seat_matrix


class Act(models.Model):
    name = models.CharField(max_length=120)
    type = models.CharField(max_length=50)
    length = models.PositiveSmallIntegerField()
    picture = models.ImageField()
    genre = models.CharField(max_length=50)
    cast = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=4, decimal_places=2)
    description = models.TextField()


class Event(models.Model):
    hall = models.ForeignKey(Hall,
                             related_name="in_hall",
                             on_delete=models.CASCADE)
    date = models.DateTimeField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    act = models.ForeignKey(Act,
                            related_name="act_of_event",
                            on_delete=models.CASCADE)


class Reservation(models.Model):
    user = models.ForeignKey(NotRegistered,
                             related_name="reservation_maker",
                             on_delete=models.CASCADE)
    event = models.ForeignKey(Event,
                              related_name="booked_event",
                              on_delete=models.CASCADE)
    paid = models.BooleanField()
    #seats


class Seat(models.Model):
    row = models.PositiveSmallIntegerField()
    seat_No = models.PositiveSmallIntegerField()
    hall = models.ForeignKey(Hall,
                             related_name="corresponding_hall",
                             on_delete=models.CASCADE)
    is_available = models.BooleanField()
