from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm

from authentication.models import User


class UserCreation(UserCreationForm):
    class Meta:
        model = User 
        fields = '__all__'



class UserAdmin(UserAdmin):
    add_form = UserCreation

    list_display = ('username', 'first_name', 'last_name', 'is_superuser')

    # define the fields that will be displayed on the UserCreationForm
    add_fieldsets = (   
        (None, {'fields': ('username', 'first_name', 'last_name', 'password1', 'password2')}),
    )

admin.site.register(User, UserAdmin)
