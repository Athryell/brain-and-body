from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from .forms import WorkoutForm
from .models import Exercise
from django.urls import reverse

@login_required
def workout(request):
    form = WorkoutForm
    exercises_list = list(Exercise.objects.all().values('name', 'category', 'isCardio'))

    return render(request, 'body/workout.html', {
        'workout_form': form,
        'exercises_list': exercises_list
    })

@login_required
def tabata(request):
    return render(request, 'body/tabata.html')

@login_required
def exercises(request):
    exercises = Exercise.objects.all()
    print(exercises)

    return JsonResponse([exercise.serialize() for exercise in exercises], safe=False)

def add_exercise(request):
    if request.method == 'POST':
        name = request.POST['name'].title()
        category = request.POST['category']
        added_by = request.user

        isCardio = request.POST.get('isCardio', False)
        if isCardio == 'on':
            isCardio = True
            
        exercise = Exercise.objects.create_exercise(name, category, isCardio, added_by)
        exercise.save()

    return HttpResponseRedirect(reverse('profile', kwargs={'username': request.user}))

def remove_exercise(request, exercise_id):
    exercises = Exercise.objects.filter(id=exercise_id)

    for e in exercises:
        e.delete()

    exercises = Exercise.objects.all()
    
    return JsonResponse([exercise.serialize() for exercise in exercises], safe=False)