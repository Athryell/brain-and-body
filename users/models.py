from django.contrib.auth.models import User
from django.db import models

LOCATION_CHOICES = [
        ('Europe', 'Europe'),
        ('America', 'America'),
        ('Africa', 'Africa'),
        ('Asia', 'Asia'),
        ('Oceania', 'Oceania')
    ]

# User Location
class UserLocationManager(models.Manager):
    def create_userlocation(self, user, location):
            user = self.create(user=user, location=location)
            return user

class UserLocation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="location")
    location = models.CharField(max_length=16, choices=LOCATION_CHOICES)

    objects = UserLocationManager()

    def __str__(self):
        return f'{self.user.username} - {self.location}'

    def serialize(self):
        return {
            'location': self.location
        }

# User Points
class UserPointsManager(models.Manager):
    def create_userpoints(self, user):
        user = self.create(user=user)
        return user

class UserPoints(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="points")
    points_workout = models.IntegerField(default=0)
    points_tabata = models.IntegerField(default=0)
    points_memory = models.IntegerField(default=0)
    points_speed = models.IntegerField(default=0)

    objects = UserPointsManager()

    def __str__(self):
        return f'{self.user.username} points: W - {self.points_workout}, T - {self.points_tabata}, M - {self.points_memory}, S - {self.points_speed}'

    def serialize(self):
        return {
            'username': self.user.username,
            'points_workout': self.points_workout,
            'points_tabata': self.points_tabata,
            'points_memory': self.points_memory,
            'points_speed': self.points_speed
        }

# Country Points
class CountryPointsManager(models.Manager):
    def create_country(self, name):
        name = self.create(name=name)

class CountryPoints(models.Model):
    name = models.CharField(max_length=16, choices=LOCATION_CHOICES)
    points_workout = models.IntegerField(default=0)
    points_tabata = models.IntegerField(default=0)
    points_memory = models.IntegerField(default=0)
    points_speed = models.IntegerField(default=0)

    objects = CountryPointsManager()

    def updatePoints(self, w_points, t_points, m_points, s_points):
        updatedWorkoutPoints = self.points_workout + w_points
        updatedTabataPoints = self.points_tabata + t_points
        updatedMemoryPoints = self.points_memory + m_points
        updatedSpeedPoints = self.points_speed + s_points
        self.save()
        
    def resetPoints(self):
        self.points_workout = 0
        self.points_tabata = 0
        self.points_memory = 0
        self.points_speed = 0
        self.save()

    def serialize(self):
        return {
            'name': self.name,
            'points_workout': self.points_workout,
            'points_tabata': self.points_tabata,
            'points_memory': self.points_memory,
            'points_speed': self.points_speed
        }

    def __str__(self):
        return f'{self.name}: W - {self.points_workout}, T - {self.points_tabata}, M - {self.points_memory}, S - {self.points_speed}'
    
