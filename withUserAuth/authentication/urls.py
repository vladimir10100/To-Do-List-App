from django.urls import path

from authentication.views import MyTokenObtainPairView, UserCreationView

from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/signup/', UserCreationView.as_view())

]
