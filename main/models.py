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
    color = models.TextField()
    session = models.ForeignKey(Session, on_delete=models.CASCADE)


class Vote(models.Model):
    id = models.AutoField()
    p = models.ForeignKey(Player, on_delete=models.CASCADE)
    voted = models.ForeignKey(Player, on_delete=models.CASCADE)


class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    p_id = models.ForeignKey(Player, on_delete=models.CASCADE)
    message = models.TextField()
