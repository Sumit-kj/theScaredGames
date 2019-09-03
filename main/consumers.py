import random
from asgiref.sync import async_to_sync
from main.models import Chat, Session, Player, Vote
from channels.generic.websocket import WebsocketConsumer
import json


class ScaredGamesConsumer(WebsocketConsumer):

    def connect(self):
        self.room = 'detective'
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
            votee = Player.objects.get(name=content['votee'])
            voted = Player.objects.get(name=content['voted'])
            v = Vote(votee, voted).save()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room,
            self.channel_name
        )

    def chat_message(self, event):
        print(event)
        self.send(text_data=json.dumps(event))



