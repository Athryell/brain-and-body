from django.db import models

class Card(models.Model):
    name = models.CharField(max_length=64)
    image = models.ImageField(upload_to='card_pics')
    # sibling = models.OneToOneField(Card2, on_delete=models.CASCADE, related_name='sibling')

    def __str__(self):
        return self.name
