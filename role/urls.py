from django.urls import path

from role import views

urlpatterns = [
    path('getrole/', views.get_role, name="get a role"),
]