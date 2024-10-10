from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError("Users must have an email address")
        nemail = self.normalize_email(email)
        user = self.model(
            email=nemail,
            username=nemail,
        )
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password=password
        )
        user.is_admin = True
        user.save()
        return user

class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    objects = UserManager()
    profile_img = models.ImageField(default='fallback.png', blank=True)

    USERNAME_FIELD="email"
    REQUIRED_FIELDS=[]

    def get_profileImg(self):
        return self.profile_img.url

class PasswordReset(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    

    