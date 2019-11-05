from django.db import models

# Create your models here.
from address.models import AddressField
from user.models import NotRegistered


class Actor(models.Model):
    name = models.CharField(max_length=120, blank=False, default="John Doe")
    year = models.PositiveSmallIntegerField(blank=False, default=0)
    picture = models.ImageField()

    def __str__(self):
        return self.name


class Director(models.Model):
    name = models.CharField(max_length=120, blank=False, default="John Doe")
    year = models.PositiveSmallIntegerField(blank=False, default=0)
    picture = models.ImageField()

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=120, blank=False, default="Unknown Genre", unique=True)

    def __str__(self):
        return self.name


class Hall(models.Model):
    name =  models.CharField(max_length=120, blank=False, default="Unknown Hall")
    # address = AddressField(on_delete=models.CASCADE)
    seats_count = models.PositiveSmallIntegerField(blank=False, default=0)
    # seat_matrix

    def __str__(self):
        return self.name

class Act(models.Model):
    name = models.CharField(max_length=120, blank=False, default="Unknown Act")
    type = models.CharField(max_length=50, blank=False, default="Unknown Type")
    length = models.PositiveSmallIntegerField(blank=False, default=0)
    picture = models.ImageField()
    # genre = models.CharField(max_length=50, blank=False, default="Unknown Genre")
    # cast = models.CharField(max_length=200, blank=False, default="Unknown Cast")
    genre = models.ManyToManyField(Genre)
    cast = models.ManyToManyField(Actor)
    director = models.ManyToManyField(Director)
    # production (napr: USA 2019)

    rating = models.DecimalField(max_digits=4, decimal_places=2, blank=False, default=0)
    description = models.TextField()

    def __str__(self):
        return self.name

    def get_cast(self, obj):
        return "\n".join([p.cast for p in obj.cast.all()])

    def get_directors(self, obj):
        return "\n".join([p.director for p in obj.director.all()])

    def get_genres(self, obj):
        return "\n".join([p.genre for p in obj.genre.all()])


class Event(models.Model):
    hall = models.ForeignKey(Hall,
                             related_name="in_hall",
                             on_delete=models.CASCADE)
    date = models.DateTimeField()
    price = models.DecimalField(max_digits=8, decimal_places=2, blank=False, default=0)
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
    paid = models.BooleanField(blank=False, default=False)
    #seats


class Seat(models.Model):
    row = models.PositiveSmallIntegerField(blank=False, default=0)
    seat_No = models.PositiveSmallIntegerField(blank=False, default=0)
    hall = models.ForeignKey(Hall,
                             related_name="corresponding_hall",
                             on_delete=models.CASCADE)
    # is_available = models.BooleanField(blank=False, default=False)

    def __str__(self):
        return self.hall + " " + str(self.row) + ":" + str(self.seat_No)


class SeatInEvent(models.Model):
    seat = models.ForeignKey(Seat,
                             related_name="selected_seat",
                             on_delete=models.CASCADE)
    event = models.ForeignKey(Event,
                              related_name="selected_event",
                              on_delete=models.CASCADE)
    is_available = models.BooleanField(blank=False, default=False)
