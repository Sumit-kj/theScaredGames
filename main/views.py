import random
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
from main.models import Session, Chat, Player

roles = ['mafia', 'mafia', 'mafia', 'doctor', 'detective', 'detective', 'citizen', 'citizen', 'citizen', 'citizen']


def get_role(request):
    role = random.choice(roles)
    roles.remove(role)
    return JsonResponse({'role': role})

@csrf_exempt
def create_session(request):
    try:
        if request.method == 'POST':
            session_id = random.getrandbits(24)
            s = Session(session=session_id, state="begin")
            s.save()
            Player(name=request.POST['name'],
            avatar="null", 
            role="null",
            alive=True,
            color="null",
            session=s).save()
            response = JsonResponse({'session': session_id, 'state': 'begin'})
            response.set_cookie('session', session_id)
            return response
        else:
            raise Exception('send a POST request')
    except Exception as e:
        print(e)
        return json_error(e)
    return None


def join_session(request, session):
    try:
        if Session.objects.filter(session=session).count() != 0:
            response = JsonResponse({'status': 'success'})
            response.set_cookie(session)
        else:
            raise Exception('session does not exist')
    except Exception as e:
        return json_error()


def get_user(request):
    return None


def create_player(request):
    try:
        if request.method == 'POST':
            p = Player.objects.get(name=request.POST['name'])
            p.alive = request.POST['alive']
            p.avatar = request.POST['avatar']
            p.color = request.POST['color']
            p.role = request.POST['role']
            p.save()
            return JsonResponse({'status': 'success'})
        else:
            raise Exception("Send a POST request with data included")
    except Exception as e:
        return json_error(e)


def kill_player(request):
    return None


def session_change(request):
    return None


def finish_game(request):
    return None


def get_all(request, session):
    query = Player.objects.filter(session=session)
    response = []
    for q in query:
        response.append(q)
    return JsonResponse(response, safe=False)

@csrf_exempt
def chat(request):
    try:
        if request.method == "POST":
            s = Session.objects.get(session=request.COOKIES['session'])
            pid = Player.objects.get(name=request.POST['name'])
            message = request.POST['message']
            Chat(session=s, p_id=pid, message=message).save()
            return JsonResponse({'status': 'success'})
        else:
            raise Exception('Please send a post message')
    except Exception as e:
        return json_error(e)


def get_chat(request):
    pass


def json_error(message):
    return JsonResponse({'status': 'failed', 'error': message})
