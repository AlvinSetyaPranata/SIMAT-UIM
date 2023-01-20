# from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from json import loads
from .models import StudentModel

# Create your views here.


def check_users(data):
    """
    Return True if user is registered
    """

    user = get_user_model().objects.filter(username=data["username"])
        
    if user:
        return True, user.get(username=data["username"])

    return False, user



@api_view(['POST'])
def user_auth(req):

    data = loads(req.body)

    status, obj = check_users(data)


    if not status:
        return JsonResponse({"status" : 1, 'msg' : "User Not Found"})


    password_correct = obj.check_password(data["password"])
    print(password_correct, data["password"])

    return JsonResponse({"status" : 0})


@api_view(['POST'])
def user_register(req):

    data = loads(req.body)


    account_data = [data.pop("username"), data.pop("password")]

    # to make sure is not pretend as junk value
    _dummy_var = [data.pop("confirm-password"), data.pop("")]
    del _dummy_var

    for x in data:
        if not hasattr(StudentModel, x):
            return JsonResponse({"status" : 0, "msg" : "".join(("data ", x, " Hilang"))})


    user_model = get_user_model()

    user_model.objects.create_user(username=account_data[0], password=account_data[-1])

    StudentModel.objects.create(user_object=user_model.objects.get(username=account_data[0]), **data)

    print(f"Account created with username of {account_data[0]} and password {account_data[-1]}")

    # get_user_model().objects.create(username="alvin12345678", password="admin1234567")


    return JsonResponse({"status" : 1, "msg" : "New user registered"})


