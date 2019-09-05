from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('sync/<str:room>/', consumers.ScaredGamesConsumer),
    path('ready/<str:room>/', consumers.LobbyConsumer),
]
