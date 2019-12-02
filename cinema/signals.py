from django.db.models.signals import post_save, m2m_changed, pre_delete
from django.dispatch import receiver

from cinema.models import Reservation, Event, Hall, Seat, SeatInEvent


@receiver(post_save, sender=Hall)
def generate_hall_seats(sender, instance, created, **kwargs):
    if instance:
        rows = instance.rows
        columns = instance.columns
        for row in range(rows):
            for column in range(columns):
                if not Seat.objects.filter(hall=instance, row=row + 1, seat_No=column + 1).exists():
                    Seat.objects.create(hall=instance, row=row+1, seat_No=column+1)
        Seat.objects.filter(hall=instance, row__gt=rows).delete()
        Seat.objects.filter(hall=instance, seat_No__gt=columns).delete()


@receiver(post_save, sender=Event)
def add_seat_to_event(sender, instance, created, **kwargs):
    if instance and created:
        seats = Seat.objects.filter(hall=instance.hall)
        for seat in seats:
            SeatInEvent.objects.create(seat=seat, event=instance, is_available=True)


@receiver(post_save, sender=Seat)
def edit_seats_in_event(sender, instance, created, **kwargs):
    if instance:
        for event in Event.objects.filter(hall=instance.hall):
            if not SeatInEvent.objects.filter(seat=instance, event=event).exists():
                SeatInEvent.objects.create(seat=instance, event=event, is_available=True)


@receiver(m2m_changed, sender=Reservation.seats.through)
def reserve_seats(sender, action, instance, **kwargs):
    if action == "post_add":
        seats = instance.get_seats()
        for seat in seats:
            se = SeatInEvent.objects.get(event_id=instance.event.id, seat_id=seat.id)
            se.is_available = False
            se.save()


@receiver(pre_delete, sender=Reservation)
def remove_reserved_seats(sender, instance, **kwargs):
    if instance:
        seats = instance.get_seats()
        for seat in seats:
            se = SeatInEvent.objects.get(event_id=instance.event.id, seat_id=seat.id)
            se.is_available = True
            se.save()
