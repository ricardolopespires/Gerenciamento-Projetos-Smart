from django.shortcuts import render
from projects.models import Project, Tarefa

# Create your views here.



def dashboard(request):
    #-------------------- Projetos ------------------------------
    projects = Project.objects.all()
    elaboracao = projects.filter(status = 'elaboração').count()
    execucao = projects.filter( status = 'execução').count()
    concluido = projects.filter( status = 'concluíndo').count()


    #------------------------- Taarefas ----------------------------

    tarefa = Tarefa.objects.all()
    TEL = tarefa.filter(status = '0').count()
    TEX = tarefa.filter(status = '2').count()
    TC = tarefa.filter(status = '3').count()

    return render(request,'manager/index.html',{

                                                #------------------ Projetos -----------------
                                                'projects':projects, 'elaboracao':elaboracao,
                                                'execucao':execucao, 'concluido':concluido, 

                                                #------------------  tarefas ----------------   
                                                
                                                'tarefa':tarefa, 'TEL':TEL, 'TEX':TEX, 'TC':TC

                                                })