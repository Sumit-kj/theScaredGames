import random
from asgiref.sync import async_to_sync
from main.models import Player, Vote, Session
from channels.generic.websocket import WebsocketConsumer
import json


class ScaredGamesConsumer(WebsocketConsumer):

    def connect(self):
        self.vote = {'city': {}, 'mafia': {}, 'doctor': {}}
        self.room = str(self.scope['url_route']['kwargs']['room'][:-1])
        print(self.room)
        async_to_sync(self.channel_layer.group_add)(
            self.room,
            self.channel_name
        )
        self.accept()

    def receive(self, text_data=None, bytes_data=None):
        content = json.loads(text_data)
        if content['type'] == 'chat':
            async_to_sync(self.channel_layer.group_send)(
                self.room,
                {'type': 'chat.message', 'name': content['name'],
                 'message': content['message']}
            )
        elif content['type'] == 'vote':
            if not content['votee'] in self.vote[content['stage']].keys():
                self.vote[content['stage']][content['votee']] = content['voted']
            elif not self.vote[content['stage']][content['votee']] == content['voted']:
                self.vote[content['stage']][content['votee']] = content['voted']
            else:
                self.vote[content['stage']][content['votee']] = ""
            async_to_sync(self.channel_layer.group_send)(
                self.room,
                {'type': 'send.vote', 'voter': content['votee'], 'voted': content['voted']}
            )
            print(self.vote)
        elif content['type'] == 'get_result':
            pass
        
    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room,
            self.channel_name
        )

    def chat_message(self, event):
        print(event)
        self.send(text_data=json.dumps(event))

    def send_vote(self, event):
        print(event)
        self.send(text_data=json.dumps(event))


class LobbyConsumer(WebsocketConsumer):

    def connect(self):
        self.room = self.scope['url_route']['kwargs']['room']
        self.ready_players = []
        async_to_sync(self.channel_layer.group_add)(
            self.room,
            self.channel_name
        )
        s = Session.objects.get(session=self.room)
        players = Player.objects.filter(session=s)
        player_data = []
        for player in players:
            player_data.append({'name': player.name, 'avatar': player.avatar})
        self.accept()
        self.send(text_data=json.dumps(player_data))

    def receive(self, text_data=None, bytes_data=None):
        content = json.loads(text_data)
        if content['type'] == 'player_join':
            async_to_sync(self.channel_layer.group_send)(
                self.room,
                {'type': 'lobby.join', 'name': content['username'], 'avatar': content['avatar']},
            )
        elif content['type'] == 'ready':
            async_to_sync(self.channel_layer.group_send)(
                self.room,
                {'type': 'lobby.read', 'name': content['username']},
            )

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room,
            self.channel_name
        )

    def lobby_read(self, event):
        print(event)
        self.ready_players.append(event['name'])
        print(self.ready_players)
        if len(self.ready_players) == 10:
            self.send(text_data=json.dumps(
                {'status': 'everyone is ready'}
            ))
        else:
            self.send(text_data=json.dumps({
                'type': 'ready',
                'name': event['name'],
            }))

    def lobby_join(self, event):
        print(event)
        self.send(text_data=json.dumps({
            'type': 'join',
            'name': event['name'],
            'avatar': event['avatar'],
        }))
