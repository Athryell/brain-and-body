from .models import Workout, Exercise
from django.forms import ModelForm

class WorkoutForm(ModelForm):
    class Meta:
        model = Workout
        fields = ['rounds', 'district_upperbody', 'district_lowerbody']
        labels = {
            'district_upperbody': 'Upper Body',
            'district_lowerbody': 'Lower Body'
        }

class ExerciseForm(ModelForm):
    class Meta:
        model = Exercise
        fields = ['name', 'category', 'isCardio']
        labels = {
            'name': 'Name',
            'category': 'Category',
            'isCardio': 'Is it cardio?'
        }