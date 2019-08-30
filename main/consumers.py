import random

from main.models import Chat, Session, Player, Vote
from channels.generic.websocket import JsonWebsocketConsumer
import json

messages = ['Hello', 'Good Morning', 'Wasting time', 'This is from the server bruh']


class ScaredGamesConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.accept()

    def receive_json(self, content, **kwargs):
        if content['type'] == 'chat':
            self.send(content['message'])
        elif content['type'] == 'vote':
            votee = Player.objects.get(name=content['votee'])
            voted = Player.objects.get(name=content['voted'])
            v = Vote(votee, voted).save()

    def disconnect(self, code):
        super().disconnect(code)



