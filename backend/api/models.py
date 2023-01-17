from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager
)
# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None):
        if not username:
            return ValueError("Nama Tidak ada")

        user = self.model(
            username=username
        )

        user.set_password(password)
        user.save(using=self.db)

        return user


    def create_superuser(self, username, password):
        user = self.create_user(username, password=password)

        user.is_teacher = True
        user.save(using=self.db)

        return user



class CustomUserModel(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True, verbose_name='name')
    is_blocked = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'


    @property
    def is_blocked(self):
        return self.is_blocked

    @property
    def is_teacher(self):
        return self.is_teacher

