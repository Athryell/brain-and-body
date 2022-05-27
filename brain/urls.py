from django.urls import path
from . import views

urlpatterns = [
    path('memory', views.memory, name='memory'),
    path('speed', views.speed, name='speed')
]
