from django.contrib import admin
from .models import UserPoints, UserLocation, CountryPoints

admin.site.register(UserPoints)
admin.site.register(UserLocation)
admin.site.register(CountryPoints)
