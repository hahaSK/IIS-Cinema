from django import forms
from cinema.models import Genre, Actor, Director


# class MovieChangeListForm(forms.ModelForm):
#     # here we only need to define the field we want to be editable
#     genre = forms.ModelMultipleChoiceField(
#         queryset=Genre.objects.all(), required=False)
#     cast = forms.ModelMultipleChoiceField(
#         queryset=Actor.objects.all(), required=False)
#     director = forms.ModelMultipleChoiceField(
#         queryset=Director.objects.all(), required=False)