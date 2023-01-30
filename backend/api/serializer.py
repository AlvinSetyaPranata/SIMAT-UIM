from django.contrib.auth import get_user_model
from .models import StudentModel
from rest_framework import serializers


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



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255, required=True)
    password = serializers.CharField(max_length=255, required=True, write_only=True)


class DetailSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255, required=True)


def StudentSerializer(query):
    data = {}
    
    fields =  (
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

    for field_name in fields:
        value = str(getattr(query, field_name))

        if value.isnumeric():
            data[field_name] = int(value)

        else:
            data[field_name] = value


    return data
