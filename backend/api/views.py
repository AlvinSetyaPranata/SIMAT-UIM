from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.core import serializers
from django.http.request import QueryDict
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import (UserRegistration, StudentRegistration, LoginSerializer, DetailSerializer, StudentSerializer)
from .models import StudentModel

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



class Login(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=self.validate_request(request.data))
        
        if serializer.is_valid():
            user = authenticate(
                request,
                **serializer.initial_data
            )

            if user:
                token = RefreshToken.for_user(user)
                return Response({'access' : str(token.access_token), 'refresh' : str(token), 'username' : str(user)}, status=status.HTTP_200_OK)

            return Response({'msg' : 'Password salah atau username tidak ditemukan!'}, status=status.HTTP_404_NOT_FOUND)


        # print(serializer.error_messages)

        return Response({'msg' : 'Form tidak valid!'}, status=status.HTTP_400_BAD_REQUEST)


    def validate_request(self, data):
        res = {}

        for keys in data:
            if type(data[keys]) == list or type(data[keys]) == tuple:
                res[keys] = data[keys][0]

            else:
                res[keys] = data[keys]

        return res

class FetchDetail(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req):
        serializer = DetailSerializer(data=self.validate_request(req.data))

        if serializer.is_valid():
            student = self.validate_student(serializer.initial_data)


            if student:
                return Response(StudentSerializer(student), status=status.HTTP_200_OK)

        return Response({'msg' : 'Invalid post data'}, status=status.HTTP_400_BAD_REQUEST)


    def validate_request(self, data):
        res = {}

        for keys in data:
            if type(data[keys]) == list or type(data[keys]) == tuple:
                res[keys] = data[keys][0]

            else:
                res[keys] = data[keys]

        return res


    def validate_student(self, data):
        try:
            student = StudentModel.objects.get(**data)
            return student

        except StudentModel.DoesNotExist:
            return False