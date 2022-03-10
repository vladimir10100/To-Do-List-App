from django.db import models

from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class CustomManager(BaseUserManager):
    
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("You need to provide a username.")
        
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("superuser must have is_staff=True")
        if extra_fields.get('is_active') is not True:
            raise ValueError("superuser must have is_active=True")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("superuser must have is_superuser=True")
        
        return self.create_user(username, password, **extra_fields)


class User(AbstractUser):
    username = models.CharField(max_length=30, unique=True)

    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = CustomManager()

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username

