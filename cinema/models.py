from django.db import models

from address.models import Address
from user.models import NotRegistered


class Actor(models.Model):
    name = models.CharField(max_length=120, blank=False, default="John Doe")
    year = models.PositiveSmallIntegerField(blank=False, default=0)
    picture = models.ImageField(upload_to='images')

    def __str__(self):
        return self.name


class Director(models.Model):
    name = models.CharField(max_length=120, blank=False, default="John Doe")
    year = models.PositiveSmallIntegerField(blank=False, default=0)
    picture = models.ImageField(upload_to='images')

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=120, blank=False, default="Unknown Genre", unique=True)

    def __str__(self):
        return self.name


class ActType(models.Model):
    name = models.CharField(max_length=120, blank=False, default="Unknown Type")

    def __str__(self):
        return self.name


class Hall(models.Model):
    name = models.CharField(max_length=120, blank=False, default="Unknown Hall")
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    rows = models.PositiveSmallIntegerField(blank=False, default=0)
    columns = models.PositiveSmallIntegerField(blank=False, default=0)
    # seat_matrix

    def __str__(self):
        return self.name


class Act(models.Model):
    name = models.CharField(max_length=120, blank=False, default="Unknown Act")
    type = models.ForeignKey(ActType, on_delete=models.CASCADE)
    length = models.PositiveSmallIntegerField(blank=False, default=0)
    picture = models.ImageField(upload_to='images')
    genre = models.ManyToManyField(Genre)
    cast = models.ManyToManyField(Actor)
    director = models.ManyToManyField(Director)
    # production (napr: USA 2019)

    rating = models.DecimalField(max_digits=4, decimal_places=2, blank=False, default=0)
    description = models.TextField()

    def __str__(self):
        return self.name

    # def get_cast(self, obj):
    #     return "\n".join([p.cast for p in obj.cast.all()])
    #
    # def get_directors(self, obj):
    #     return "\n".join([p.director for p in obj.director.all()])
    #
    # def get_genres(self, obj):
    #     return "\n".join([p.genre for p in obj.genre.all()])

    def add_to_genre(self, genre):

        self.genre.add(genre)

    def add_to_cast(self, cast):

        self.cast.add(cast)

    def add_to_director(self, director):

        self.director.add(director)

    @staticmethod
    def register_new_act(name, type, length, genre, cast, director, rating, description):

        new_act = Act.objects.create(name=name, type=type, length=length, rating=rating, description=description)
        new_act.add_to_genre(genre)
        new_act.add_to_cast(cast)
        new_act.add_to_director(director)
        new_act.save()

        return new_act


class Seat(models.Model):
    row = models.PositiveSmallIntegerField(blank=False, default=0)
    seat_No = models.PositiveSmallIntegerField(blank=False, default=0)
    hall = models.ForeignKey(Hall,
                             related_name="corresponding_hall",
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.hall.name + " r" + str(self.row) + ":s" + str(self.seat_No)


class Event(models.Model):
    hall = models.ForeignKey(Hall,
                             related_name="in_hall",
                             on_delete=models.CASCADE)
    date = models.DateTimeField()
    price = models.DecimalField(max_digits=8, decimal_places=2, blank=False, default=0)
    act = models.ForeignKey(Act,
                            related_name="act_of_event",
                            on_delete=models.CASCADE)
    seats = models.ManyToManyField(Seat, through='SeatInEvent')

    def __str__(self):
        return self.act.name + " AT '" + self.hall.name + "' ON: " + str(self.date.date())


class Reservation(models.Model):
    user = models.ForeignKey(NotRegistered,
                             related_name="reservation_maker",
                             on_delete=models.CASCADE)
    event = models.ForeignKey(Event,
                              related_name="booked_event",
                              on_delete=models.CASCADE)
    paid = models.BooleanField(blank=False, default=False)
    seats = models.ManyToManyField(Seat, related_name="reserved_seats")

    def get_seats(self):
        return self.seats.all()

    def __str__(self):
        return self.user.name + "'s reservation for '" + self.event.__str__()


class SeatInEvent(models.Model):
    seat = models.ForeignKey(Seat,
                             related_name="selected_seat",
                             on_delete=models.CASCADE)
    event = models.ForeignKey(Event,
                              related_name="selected_event",
                              on_delete=models.CASCADE)
    is_available = models.BooleanField(blank=False, default=True)
