from django.db import models


class Session(models.Model):
    session = models.CharField(max_length=12, primary_key=True)
    state = models.TextField()


class Player(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()
    avatar = models.TextField()
    role = models.TextField()
    alive = models.BooleanField()
    name = models.TextField()
    color = models.TextField()
    session = models.ForeignKey(Session, on_delete=models.CASCADE)


class Chat(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    p_id = models.ForeignKey(Player, on_delete=models.CASCADE)
    message = models.TextField()
