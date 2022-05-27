from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from body.models import Exercise
from users.models import User
from body.forms import ExerciseForm

def home(request):
    return render(request, 'brain_and_body/home.html')

@login_required
def profile(request, username):
    stats = request.user.points
    exercises = list(Exercise.objects.filter(added_by=request.user))

    form = ExerciseForm

    return render(request, 'brain_and_body/profile.html', {
        'stats': stats,
        'exercises': exercises,
        'form': form
    })

def global_stats(request):
    return render(request, 'brain_and_body/global_stats.html')
