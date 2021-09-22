from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.utils import timezone
from datetime import timedelta
from django.db import models
from django.conf import settings






class Project(models.Model):

    STATUS_CHOICE = (
                ('elaboração', 'Elaboração'),
                ('execução', 'Execução'),
                ('concluíndo', 'Concluído'),
            )

    TIME_COURSE = (
                ('1', 'No prazo'),
                ('2', 'Atrasado'),
                ('3', 'Concluído'),
            )

    id = models.CharField(max_length=100, primary_key = True, blank=True)    
    nome = models.CharField(max_length=50)
    descricao = models.TextField() 
    slug = models.SlugField('shortcut', blank=True)
    img = models.ImageField(upload_to ='projects_images', blank = True)
    assign = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name = 'projects_user')
    efforts = models.DurationField()
    status = models.CharField(max_length=40, choices = STATUS_CHOICE, default='elaboração')
    time_course = models.CharField(max_length=7, choices= TIME_COURSE, default=1)
    dead_line = models.DateField()    
    complete_per = models.IntegerField( validators = [MinValueValidator(0), MaxValueValidator(100)])
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now = True)

    def addEquipe(self, equipe):
        equipe.projeto = self
        equipe.save()

    class Meta:
        db_table = "projeto"

    def __str__(self):
        return self.nome


class Tarefa(models.Model):

    STATUS_TAREFA = (
        (0, "ABERTA"),
        (1, "TRABALHANDO"),
        (2, "PAUSADA"),
        (3, "CONCLUíDA")
    )

    
    titulo = models.CharField(max_length=50)
    descricao = models.CharField(max_length=100)
    data_conclusao = models.DateTimeField(null=True)
    projeto = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="tarefas"
    )
    horario_de_inicio_atual = models.DateTimeField(auto_now_add = True, blank=True, null=True)
    duracao_total = models.DurationField(
        null=True,
        default=timedelta(seconds=0)
    )
    status = models.CharField(max_length=19, default=0, choices=STATUS_TAREFA)
    #responsavel = models.ForeignKey(Funcionario, null=True,on_delete=models.SET_NULL)
    complete_per = models.IntegerField( validators = [MinValueValidator(0), MaxValueValidator(100)])
    pre_requisito = models.ManyToManyField(
        "self",
        symmetrical=False,
        related_name="pre_requisitos", default=0
    )

    @property
    def is_open(self):
        return self.status == '0'

    @property
    def is_running(self):
        return self.status == '1'

    @property
    def is_paused(self):
        return self.status == '2'

    @property
    def is_done(self):
        return self.status == '3'

    def iniciar(self):
        self.horario_de_inicio_atual = timezone.now()
        self.status = 1

        self.save()

    def concluir(self):

        self.dataconclusao = timezone.now()
        self.duracao_total += timezone.now() - self.dataconclusao
        self.status = 3
        self.save()

    def pausar(self):
        diferenca = timezone.now() - self.horario_de_inicio_atual
        self.duracao_total += diferenca
        self.status = 2
        self.save()

    @property
    def permitido_iniciar(self):

        for requisito in self.pre_requisitos:
            if requisito.status != 3:
                return False
        return True

    class Meta:
        db_table = "tarefa"

    def __str__(self):
        return "{}, {}".format(self.titulo, self.status)
