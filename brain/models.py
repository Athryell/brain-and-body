from django.db import models

class Card(models.Model):
    name = models.CharField(max_length=64)
    image_name = models.CharField(max_length=32, default='empty')

    def __str__(self):
        return self.name

    def save(self):
        self.image_name = f'{self.name.lower().replace(" ", "-")}.png'
        return super(Card, self).save()
