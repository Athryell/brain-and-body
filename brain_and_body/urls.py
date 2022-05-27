from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('global_stats/', views.global_stats, name="global_stats"),
    path('profile/<str:username>', views.profile, name="profile")
]
