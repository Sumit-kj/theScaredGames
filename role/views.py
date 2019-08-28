import random
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

# Create your views here.
roles = ['mafia', 'mafia', 'mafia', 'doctor', 'detective', 'detective', 'citizen', 'citizen', 'citizen', 'citizen']


def get_role(request):
    role = random.choice(roles)
    roles.remove(role)
    return JsonResponse({'role': role})
