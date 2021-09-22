from django.urls import path
from . import views



urlpatterns = [

        path('manager/projetos/', views.project, name = 'projects_manager'),
        path('manager/novo_projeto/', views.new_project, name = 'new_project'),        
        path('manager/<projects_id>/updated/', views.updated, name = 'updated_project'),
        path('manager/<projects_id>/deletar/',views.detele, name = 'delete_project'),
      

        #---------------------------------  TAREFAS  -----------------------------------------------------

        path('manager/projetos/<projects_id>/tarefas/',views.tarefas, name = 'tarefas'),
        path('manager/tarefas/<tarefas_id>/conteudo/', views.tarefa, name = 'conteudo'),
        path('projetos/tarefa/<projects_id>/created/', views.created_tarefa, name = 'created_tarefas'),
        path('projetos/tarefa/<tarefas_id>/updated/', views.updated_tarefas, name = 'updated_tarefas'),
        path('manager/projetos/tarefa/<tarefas_id>/deletar/', views.detele_tarefa, name = 'delete_tarefas'),
        path("<int:id_tarefa>/iniciar", views.iniciar_tarefa,  name="iniciar_tarefa" ),
        path("<int:id_tarefa>/pausar", views.pausar_tarefa, name="pausar_tarefa" ),
        path("<int:id_tarefa>/concluir", views.concluir_tarefa, name="concluir_tarefa"  ),
        path('tarefa/<int:id_tarefa>/etapaconcluida/',views.etapa_conluida, name = 'etapa_concluido'),
        path('tarefa/<projects_id>/timeline/',views.timeline, name = 'timeline'),
]