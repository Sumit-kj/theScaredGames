from django.urls import path

from main import views

urlpatterns = [
    path('role/<str:session>/', views.get_role, name="get a role"),
    path('create_session/', views.create_session, name="create a new session for a game"),
    path('join_session/<str:session>/', views.join_session, name="join an existing session"),
    path('add_player/', views.create_player, name="add a new player"),
    path('kill_player/<int:player_id>/', views.kill_player, name="change player status from alive to dead"),
    path('finish_game/', views.finish_game, name="terminate the session"),
    path('get_all_players/<str:session>/', views.get_all, name="get all players and their states"),
    path('status/<str:name>/', views.player_status, name="get all players and their states"),
]