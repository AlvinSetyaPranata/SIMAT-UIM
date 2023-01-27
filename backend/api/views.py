from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http.request import QueryDict
from django.contrib.auth import get_user_model
from .serializer import (UserRegistration, StudentRegistration)


class Register(APIView):

    def post(self, req):
        req_data = req.data

        data = QueryDict('', mutable=True)
        data.update(req_data)


        msg  = self.validate_username(data)
            
        if msg: 
            return Response({"msg" : msg}, status=status.HTTP_400_BAD_REQUEST)


        userSerializer = UserRegistration(data=data)

        if not userSerializer.is_valid():
            return Response({"msg" : "Data tidak cocok"}, status=status.HTTP_400_BAD_REQUEST)

        userSerializer.save()

        data.update({"user_object" : get_user_model().objects.get(username=data["username"]).id})

        studentSerializer = StudentRegistration(data=data)


        if not studentSerializer.is_valid():
            print(studentSerializer.errors)
            return Response({"msg" : "Invalid Student"}, status=status.HTTP_400_BAD_REQUEST)

        studentSerializer.save()


        return Response({"msg" : "User baru telah terdaftar", "username" : data["username"]}, status=status.HTTP_201_CREATED)


    def validate_username(self, data):
        user = get_user_model()

        if not "username" in data:
            return "username does not included"

        try:
            user.objects.get(username=data["username"])
            return "username already registered"

        except user.DoesNotExist:
            return False
