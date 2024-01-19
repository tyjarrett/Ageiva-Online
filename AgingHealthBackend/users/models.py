from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    def create_user(self, username, password, profilePic=None):
        super().create_user(username=username, password=password)