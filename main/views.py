import random
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
from main.models import Session, Chat, Player

roles = ['mafia', 'mafia', 'mafia', 'doctor', 'detective', 'detective', 'citizen', 'citizen', 'citizen', 'citizen']
colours =['#0000cd', '#F08080', '#00ff00', '#40e0d0', '#7B68EE', '#FF00ff', '#8B008B', '#FF1493', '#DAA520', '#ccaadd']


def get_role(request):
    role = random.choice(roles)
    roles.remove(role)
    color = random.choice(colours)
    colours.remove(color)
    return JsonResponse({'role': role,'color':color})

@csrf_exempt
def create_session(request):
    try:
        if request.method == 'POST':
            session_id = random.getrandbits(24)
            s = Session(session=session_id, state="begin")
            s.save()
            Player(name=request.POST['name'], alive=True,
                   avatar="null", role="null", color="null", session=s).save()
            response = JsonResponse({'session': session_id, 'state': 'begin'})
            response.set_cookie('session', session_id)
            return response
        else:
            raise Exception('send a POST request')
    except Exception as e:
        print(e)
        return json_error(e)
    return None

@csrf_exempt
def join_session(request,session):
    try:
        player_session = Session.objects.get(session=session)
        if Player.objects.get(session=player_session,name=request.POST['name']) is not None:
            raise Exception('Player Already Exists!')
            print("here")
        elif Session.objects.get(session=str(session)) is not None:
            response = JsonResponse({'session': session, 'state': 'begin'})
            Player(name=request.POST['name'], alive=True,
                   avatar="null", role="null", color="null", session=Session.objects.get(session=session)).save()
            response.set_cookie('session', session)
            return response
        else:
            raise Exception('session does not exist')
    except Exception as e:
        return json_error(e)


def get_user(request):
    return None

@csrf_exempt
def create_player(request):
    try:
        if request.method == 'POST':
            p = Player.objects.get(name=request.POST['name'],session=request.POST['session'])
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


def kill_player(request, pid):
    Player.objects.get(id=pid).delete()


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
            s = request.COOKIES['session']
            p_id = Session.objects.get(request.POST['pid'])
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
    return JsonResponse({'status': 'failed', 'error': str(message)})
