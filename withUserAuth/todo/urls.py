from django.urls import path

from todo.views import UserToDoView, UserToDoDetailView,AllToDoView


urlpatterns = [
    path('todo/', UserToDoView.as_view()),
    path('todo/<int:todo_id>/', UserToDoDetailView.as_view()),
    path('', AllToDoView.as_view())
]