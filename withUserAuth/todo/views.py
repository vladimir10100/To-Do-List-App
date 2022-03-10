from django.shortcuts import get_object_or_404
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist



from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from todo.models import ToDo
from todo.serializers import ToDoSerializer

from authentication.models import User


# class ToDoViewSet(viewsets.ModelViewSet):
#     queryset = ToDo.objects.all()
#     serializer_class = ToDoSerializer
    

# class UserToDoViewSet(viewsets.ModelViewSet):
#     queryset = ToDo.objects.all()
#     serializer_class = ToDoSerializer

#     def get_queryset(self):
#         user = self.request.user
#         query = super().get_queryset()
#         return query.filter(user=user)

class AllToDoView(APIView):
    serializer_class = ToDoSerializer

    def get(self, request):
        data = ToDo.objects.all()
        serializer = self.serializer_class(instance=data, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)



class UserToDoView(APIView):
    serializer_class = ToDoSerializer
    # permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user 
        data = user.todo_set.all()
        serializer = self.serializer_class(instance=data, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserToDoDetailView(APIView):
    serializer_class = ToDoSerializer

    def get(self, request, todo_id):
        # obj = get_object_or_404(ToDo, pk=todo_id)
        # user = request.user
        # data = user.todo_set.all()


        try:
            user = request.user
            data = user.todo_set.get(pk=todo_id)

            if data:        #Do something
                serializer = self.serializer_class(instance=data)
                return Response(data=serializer.data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            raise Http404                   # NOT IN USER's ToDo LIST


    def put(self, request, todo_id):
        try:
            user = request.user
            data = user.todo_set.get(pk=todo_id)

            if data:        #Do something
                serializer = self.serializer_class(data=request.data, instance=data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(data=serializer.data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            raise Http404                   # NOT IN USER's ToDo LIST


    
    def delete(self, request, todo_id):
        try:
            user = request.user
            data = user.todo_set.get(pk=todo_id)

            if data:        #Do something
                data.delete()
                return Response(status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            raise Http404                   # NOT IN USER's ToDo LIST