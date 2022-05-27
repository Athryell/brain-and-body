import json
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.shortcuts import render
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from .models import User, UserPoints, UserLocation, CountryPoints, LOCATION_CHOICES
from body.models import Exercise
from .forms import UserLocationForm
from django.contrib.auth.decorators import login_required

@login_required
def global_stats_api(request):
    users = User.objects.all()
    country_points = CountryPoints.objects.all()

    for location in LOCATION_CHOICES:
        if not CountryPoints.objects.filter(name=location[0]).exists():
            CountryPoints.objects.create_country(location[0])

    # Maybe it is better and more performant through JS with fetch 'PUT' request
    # but I wanted to experiment with models' methods
    for c in CountryPoints.objects.all():
        c.resetPoints()

    for user in users:
        try: 
            loc = user.location.location
        except:
            print(f'{user.username} has no location')
        try:
            p = user.points
        except:
            print(f'{user.username} has no points')
        countryToUpdate = CountryPoints.objects.get(name=loc)
        countryToUpdate.points_workout += p.points_workout
        countryToUpdate.points_tabata += p.points_tabata
        countryToUpdate.points_memory += p.points_memory
        countryToUpdate.points_speed += p.points_speed
        countryToUpdate.updatePoints(p.points_workout, p.points_tabata, p.points_memory, p.points_speed)

    return JsonResponse([c.serialize() for c in country_points], safe=False)


@login_required
@csrf_exempt
def user_points(request, username):
    user_id = User.objects.get(username=username).id
    points = UserPoints.objects.get(user=user_id)

    if request.method == 'GET':
        return JsonResponse(points.serialize())

    if request.method == 'PUT':
        data = json.loads(request.body)

        if data.get('points_memory') is not None:
            points.points_memory = data['points_memory']
        if data.get('points_speed') is not None:
            points.points_speed = data['points_speed']
        if data.get('points_tabata') is not None:
            points.points_tabata = data['points_tabata']
        if data.get('points_workout') is not None:
            points.points_workout = data['points_workout']
        points.save()

        return HttpResponse(status=204)
    
    else:
        return JsonResponse({'error': 'GET or PUT request required'}, status=400)


def login_view(request):
    if request.method == 'POST':

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("home"))
        else:
            return render(request, "users/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "users/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("home"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        location = request.POST["location"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "users/register.html", {
                "message": "Passwords must match.",
                "locations": UserLocationForm()
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()

        except IntegrityError:
            return render(request, "users/register.html", {
                "message": "Username already taken.",
                "locations": UserLocationForm()
            })

        user_points = UserPoints.objects.create_userpoints(user)
        user_location = UserLocation.objects.create_userlocation(user, location)
        # Created from admin page
        default_exercises = Exercise.objects.filter(added_by=User.objects.get(username='admin'))
        # Created with JSON
        default_exercises_admin = Exercise.objects.filter(added_by=None)

        for e in default_exercises:
            Exercise.objects.create_exercise(name=e.name, category=e.category, isCardio=e.isCardio, added_by=user)
        for e in default_exercises_admin:
            Exercise.objects.create_exercise(name=e.name, category=e.category, isCardio=e.isCardio, added_by=user)

        login(request, user)
        return HttpResponseRedirect(reverse("home"))
    else:
        return render(request, "users/register.html", {
            'locations': UserLocationForm()
        })

