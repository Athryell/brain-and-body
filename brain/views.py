from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from random import shuffle
from .models import Card

@login_required
def memory(request):
    cards = Card.objects.all()[:6]
    deck = []
    for c in cards:
        deck.append(c)
        deck.append(c)

    shuffle(deck)

    return render(request, 'brain/memory.html', {
        'deck': deck
    })

@login_required
def speed(request):
    return render(request, 'brain/speed.html')
