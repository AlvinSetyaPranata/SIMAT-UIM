# from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from json import loads
import requests
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

    # print(get_user_model().objects.filter(username=data["username"]).values()[0])

    print(data["password"])
    print(obj.check_password(data["password"]))

    return JsonResponse({"status" : 0})


@api_view(['POST'])
def user_register(req):

    data = loads(req.body)

    status, obj = check_users(data)
    
    
    if status:
        return JsonResponse({"status" : 0, "msg" : "User exists"})


    obj.objects.create(username=data["username"], password=data["password"])
    # get_user_model().objects.create(username="alvin12345678", password="admin1234567")


    return JsonResponse({"status" : 1, "msg" : "New user registered"})


