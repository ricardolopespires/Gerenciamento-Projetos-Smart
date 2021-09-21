from django.contrib import admin
from .models import Project,  Tarefa



@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['id','nome','status']
    list_filter = ['id','nome','status']
    search_fields = ['id', 'nome','status']



@admin.register(Tarefa)
class TarefaAdmin(admin.ModelAdmin):
    list_display = [ 'projeto','titulo','data_conclusao']
    list_filter = ['projeto', 'titulo','data_conclusao']
    search_fields = ['projeto', 'titulo']