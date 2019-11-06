from django.contrib import admin
from django.contrib.admin.views.main import ChangeList

# Register your models here.
from cinema.models import Event, Act, Hall, Reservation, Seat, Actor, Director, Genre, SeatInEvent, ActType
from cinema.forms import MovieChangeListForm


class MovieChangeList(ChangeList):
    def __init__(self, request, model, list_display,
                 list_display_links, list_filter, date_hierarchy,
                 search_fields, list_select_related, list_per_page,
                 list_max_show_all, list_editable, model_admin, sortable_by):
        super(MovieChangeList, self).__init__(request, model,
                                              list_display, list_display_links, list_filter,
                                              date_hierarchy, search_fields, list_select_related,
                                              list_per_page, list_max_show_all, list_editable,
                                              model_admin, sortable_by)

        # these need to be defined here, and not in MovieAdmin
        self.list_display = ['action_checkbox', 'name', 'type', 'length', 'picture',
                    'genre', 'cast', 'director', 'rating', 'description']
        self.list_display_links = ['name']
        self.list_editable = ['genre', 'cast', 'director']


@admin.register(Act)
class MovieAdmin(admin.ModelAdmin):

    def get_changelist(self, request, **kwargs):
        return MovieChangeList

    def get_changelist_form(self, request, **kwargs):
        return MovieChangeListForm


@admin.register(ActType)
class ActTypeAdmin(admin.ModelAdmin):
    list_display = ('name', )


@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'picture')


@admin.register(Director)
class DirectorAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'picture')


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name', )


@admin.register(Hall)
class HallAdmin(admin.ModelAdmin):
    list_display = ('name', 'seats_count')


# @admin.register(Act)
# class ActAdmin(admin.ModelAdmin):
#     list_display = ('name', 'type', 'length', 'picture',
#                     'genre', 'cast', 'director', 'rating', 'description')



@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('hall', 'date', 'price', 'act')


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'paid')


@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ('row', 'seat_No', 'hall')


@admin.register(SeatInEvent)
class SeatEventAdmin(admin.ModelAdmin):
    list_display = ('seat', 'event', 'is_available')
