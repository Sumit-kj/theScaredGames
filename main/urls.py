from django.urls import path

from main import views

urlpatterns = [
    path('role/', views.get_role, name="get a role"),
    path('create_session/', views.create_session, name="create a new session for a game"),
    path('join_session/<str:session>/', views.join_session, name="join an existing session"),
    path('load_existing_user/', views.get_user, name="load properties of an existing user"),
    path('add_player/', views.create_player, name="add a new player"),
    path('kill_player/<int:player_id>/', views.kill_player, name="change player status from alive to dead"),
    path('change_session_state/<str:session>/<int:state>/', views.session_change, name="change rounds"),
    path('finish_game/<str:session>/', views.finish_game, name="terminate the session"),
    path('get_all_players/<str:session>/', views.get_all, name="get all players and their states"),
    path('chat/send', views.chat, name="get all players and their states"),
    path('chat/get', views.get_chat, name="get all players and their states"),
]