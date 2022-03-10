from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView



from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from authentication.models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # custom claims
        token['username'] = user.username
        return token 


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class UserCreationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(min_length=2)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    password = serializers.CharField(min_length=2)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'password']
    
    # def validate(self, attrs):


class UserCreationView(APIView):
    serializer_class = UserCreationSerializer

    def post(self, request):
        data = request.data 
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)