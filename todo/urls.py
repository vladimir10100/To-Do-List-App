from django.urls import path 

from todo.views import ToDoViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('todo', ToDoViewSet)
