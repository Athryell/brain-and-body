from django.db import models
from users.models import User


class Workout(models.Model):
    rounds = models.IntegerField(default=1)
    district_upperbody = models.BooleanField()
    district_lowerbody = models.BooleanField()

    def __str__(self):
        return self.name

class ExercisesManager(models.Manager):
    def create_exercise(self, name, category, isCardio, added_by):
        exercise = self.create(name=name, category=category, isCardio=isCardio, added_by=added_by)
        return exercise

class Exercise(models.Model):
    CATEGORY_CHOICES = [
        ('Upper Body', 'Upper Body'),
        ('Lower Body', 'Lower Body'),
        ('Full Body', 'Full Body')
    ]

    name = models.CharField(max_length=32)
    category = models.CharField(max_length=16, choices=CATEGORY_CHOICES)
    isCardio = models.BooleanField(default=False)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="exercises", null=True)
    
    objects = ExercisesManager()

    def __str__(self):
        cardio = ''
        if self.isCardio: 
            cardio = '(cardio)'

        return f'{self.category} - {self.name} {cardio}'

    def serialize(self):
        if self.added_by != None:
            username = self.added_by.username
        else:
            username = "None"
        return {
            'name': self.name,
            'category': self.category,
            'isCardio': self.isCardio,
            'added_by': username
        }
    