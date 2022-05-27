from .models import UserLocation
from django.forms import ModelForm

class UserLocationForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super(UserLocationForm, self).__init__(*args, **kwargs)
        self.fields['location'].initial = 'Europe'
        
    class Meta:
        model = UserLocation
        fields = ["location"]