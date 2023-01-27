from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import StudentModel


CustomBaseUser = get_user_model()

class UserRegistration(serializers.ModelSerializer):   
    class Meta:
        model = CustomBaseUser
        fields = ('username', 'password')

    def create(self, data):

        user = CustomBaseUser.objects.create(username=data["username"])

        user.set_password(data.pop("password"))
        user.save()

        return user




class StudentRegistration(serializers.ModelSerializer):
    class Meta:
        model = StudentModel
        fields = (
            'fullName',
            'nik',
            'gender',
            'placeBirth',
            'dateBirth',
            'monthBirth',
            'yearBirth',
            'religion',
            'email',
            'phoneNumber',
            'addr',
            'postalCode',
            'province',
            'districts',
            'subDistricts',
            'lastEdu',
            'schoolName',
            'schoolAddr',
            'firstOpt',
            'secondOpt',
            'lastOpt',
            'user_object',
            'username'
        )

    def create(self, data):
        student = StudentModel.objects.create(
            **data,
        )
        student.save()

        return student

