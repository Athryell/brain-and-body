from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('workout', views.workout, name='workout'),
    path('tabata', views.tabata, name='tabata'),
    path('exercises', views.exercises, name='exercises'),
    path('add_exercise', views.add_exercise, name="add_exercise"),
    path('remove_exercise/<int:exercise_id>', views.remove_exercise, name='remove_exercise'),
    # path('exercises/<str:upper_lower>/<int:isCardio>', views.exercises, name='exercises')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)