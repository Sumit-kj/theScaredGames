import random
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
from main.models import Session, Chat, Player

sessions = {}


def get_role(request, session):
    s = int(session)
    try:
        if len(sessions[s]['roles']) == 0:
            raise Exception('The room is full. Please join another session')
        role = random.choice(sessions[s]['roles'])
        sessions[s]['roles'].remove(role)
        color = random.choice(sessions[s]['colours'])
        sessions[s]['colours'].remove(color)
        return JsonResponse({'role': role, 'color': color})
    except Exception as e:
        return json_error(e)


@csrf_exempt
def create_session(request):
    try:
        if request.method == 'POST':
            session_id = random.getrandbits(24)
            sessions[session_id] = {
                'roles': ['mafia', 'mafia', 'mafia', 'doctor', 'detective', 'detective',
                          'citizen', 'citizen', 'citizen', 'citizen'],
                'colours': ['#0000cd', '#F08080', '#00ff00', '#40e0d0', '#7B68EE', '#FF00ff', '#8B008B',
                            '#FF1493', '#DAA520', '#ccaadd']
            }
            print(sessions)
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
def join_session(request, session):
    try:
        player_session = Session.objects.get(session=session)
        # if Player.objects.get(session=player_session,name=request.POST['name']) is not None:
        #     raise Exception('Player Already Exists!')
        if Session.objects.get(session=str(session)) is not None:
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


def finish_game(request, session):
    Session.objects.get(session=session).delete()


def get_all(request, session):
    query = Player.objects.filter(session=session)
    response = []
    for q in query:
        response.append(q)
    return JsonResponse(response, safe=False)


def json_error(message):
    return JsonResponse({'status': 'failed', 'error': message})


def player_status(request, name):
    if Player.objects.get(name=name).alive:
        return JsonResponse({'alive': 'true'})
    return JsonResponse({'alive': 'false'})


def json_error(message):
    return JsonResponse({'status': 'failed', 'error': str(message)})
