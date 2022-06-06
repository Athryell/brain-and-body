from django.db import models

class Card(models.Model):
    name = models.CharField(max_length=64)
    image = models.ImageField(upload_to='card-pics')

    def __str__(self):
        return self.name
