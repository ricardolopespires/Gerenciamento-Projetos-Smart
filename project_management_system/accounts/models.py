import re
from phone_field import PhoneField
from django.db import models
from django.core import validators
from django.utils import timezone 
from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin, UserManager)
from django.conf import settings
from django.contrib.auth.models import UserManager

class User(AbstractBaseUser, PermissionsMixin):

    STATUS_GENRE = (
                    ('masculino', 'Masculoino'),
                    ('feminino','Feminino')
                    )

    STATUS_CHOICES = (
                        ('ativos','Ativos'),
                        ('pendentes','Pendentes'),
                        ('inativos','Inativos'),
                     )

    username = models.CharField(
        'Nome de Usuário', max_length=30, unique=True, 
        validators=[validators.RegexValidator(re.compile('^[\w.@+-]+$'),
            'O nome de usuário só pode conter letras, digitos ou os '
            'seguintes caracteres: @/./+/-/_', 'invalid')]
    )
    email = models.EmailField('E-mail', unique=True)
    name = models.CharField('Nome', max_length=100, blank=True)
    address = models.CharField('Endereço', max_length = 190, blank = True)
    date_of_birth = models.DateTimeField(default=timezone.now) 
    state = models.CharField('Estado',  max_length = 100, blank = True)
    status = models.CharField(max_length = 100, choices = STATUS_CHOICES, default = 'ativos')
    genre = models.CharField(max_length = 100, choices = STATUS_GENRE, default = 'masculino')
    city = models.CharField('Cidade', max_length = 190, blank = True)
    phone = PhoneField(blank=True, help_text='Contact phone number')
    is_active = models.BooleanField('Está ativo?', blank=True, default=True)
    is_staff = models.BooleanField('É da equipe?', blank=True, default=False)
    date_joined = models.DateTimeField('Data de Entrada', auto_now_add=True)
    img = models.ImageField(upload_to = 'user', blank = True)
  

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.name or self.username

    def get_short_name(self):
        return self.username

    def get_full_name(self):
        return str(self)

    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

    objects = UserManager()

    class Meta:
        db_table = u'user'