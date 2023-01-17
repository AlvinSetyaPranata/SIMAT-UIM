# from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from json import loads
# Create your views here.


def check_users(data):
    """
    Return True if user is registered
    """


    user = get_user_model()


    if user.objects.filter(username=data["username"]):
        return True, None

    return False, user



@api_view(['POST'])
def user_auth(req):

    data = loads(req.body)

    status, obj = check_users(data)

    if not status:
        return JsonResponse({"status" : 1, 'msg' : "User Not Found"})


    return JsonResponse({"status" : 0})


@api_view(['POST'])
def user_register(req):

    data = loads(req.body)

    status, obj = check_users(data)
    
    
    if status:
        return JsonResponse({"status" : 0, "msg" : "User exists"})


    obj.objects.create(username=data["username"], password=data["password"])


    return JsonResponse({"status" : 1, "msg" : "New user registered"})