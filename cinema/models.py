from django.db import models
from django.dispatch import receiver

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
    rows = models.PositiveSmallIntegerField(blank=False, default=0)
    columns = models.PositiveSmallIntegerField(blank=False, default=0)
    # seat_matrix

    def __str__(self):
        return self.name

class Act(models.Model):
    name = models.CharField(max_length=120, blank=False, default="Unknown Act")
    type = models.CharField(max_length=50, blank=False, default="Unknown Type")
    length = models.PositiveSmallIntegerField(blank=False, default=0)
    picture = models.ImageField()
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


class Seat(models.Model):
    row = models.PositiveSmallIntegerField(blank=False, default=0)
    seat_No = models.PositiveSmallIntegerField(blank=False, default=0)
    hall = models.ForeignKey(Hall,
                             related_name="corresponding_hall",
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.hall.name + " r" + str(self.row) + ":s" + str(self.seat_No)

    @receiver(models.signals.post_save, sender=Hall)
    def create_instance(sender, instance, created, **kwargs):
        if instance and created:
            rows = instance.rows
            columns = instance.columns
            for row in range(rows):
                for column in range(columns):
                    Seat.objects.create(hall=instance, row=row+1, seat_No=column+1)


class Event(models.Model):
    hall = models.ForeignKey(Hall,
                             related_name="in_hall",
                             on_delete=models.CASCADE)
    date = models.DateTimeField()
    price = models.DecimalField(max_digits=8, decimal_places=2, blank=False, default=0)
    act = models.ForeignKey(Act,
                            related_name="act_of_event",
                            on_delete=models.CASCADE)
    members = models.ManyToManyField(Seat, through='SeatInEvent')

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
    seats = models.ManyToManyField(Seat)

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

    @receiver(models.signals.post_save, sender=Event)
    def create_instance(sender, instance, created, **kwargs):
        if instance and created:
            seats = Seat.objects.filter(hall=instance.hall)
            for seat in seats:
                SeatInEvent.objects.create(seat=seat, event=instance, is_available=True)
