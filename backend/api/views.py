from rest_framework.views import APIView, View
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.http.request import QueryDict
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import (UserRegistration, StudentRegistration, LoginSerializer, DetailSerializer)
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
        serializer = LoginSerializer(data=request.data)
        
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

class FetchDetail(APIView):

    def post(self, req):
        serializer = DetailSerializer(data=req.data)

        if serializer.is_valid():
            student_exists = self.validate_student(serializer.initial_data)

            if student_exists:
                return Response

        return Response({}, status=status.HTTP_200_OK)


    def validate_student(self, data):
        try:
            StudentModel.objects.get(**data)
            return True

        except StudentModel.DoesNotExist:
            return False