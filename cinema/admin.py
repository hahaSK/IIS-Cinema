from django.contrib import admin

# Register your models here.
from cinema.models import Event, Act, Hall, Reservation, Seat


@admin.register(Hall)
class HallAdmin(admin.ModelAdmin):
    list_display = ('id', 'address', 'seats_count')


@admin.register(Act)
class ActAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'length', 'picture',
                    'genre', 'cast', 'rating', 'description')


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('hall', 'date', 'price', 'act')


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'paid')


@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ('row', 'seat_No', 'hall', 'is_available')
