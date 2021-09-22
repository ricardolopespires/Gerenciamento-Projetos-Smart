from django.shortcuts import render, reverse, HttpResponseRedirect, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .forms import ProjectForm,  TarefaForm
from .models import Project, Tarefa
from django.contrib import messages
from django.db.models import Avg
from datetime import datetime
# Create your views here.




@login_required
def project(request):
    projects = Project.objects.all()
    try:
        avg_projects = int(Tarefa.objects.all().aggregate(Avg('complete_per'))['complete_per__avg'])
    except:
        avg_projects = 0
    print(projects)
    return render(request, 'manager/projects/index.html',{'projects':projects, 'avg_projects' : avg_projects, })


@login_required
def new_project(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST or None, request.FILES or None)
        if form.is_valid():
            form.save()
            messages.success(request, "Parabéns o novo projetos criado com sucesso!!!!")
            return HttpResponseRedirect(reverse('projects_manager'))
        
        else:
            messages.error(request, "Ops.... os dados estão incorretos")

    else:
        form = ProjectForm()
    return render(request, 'manager/projects/form.html',{'form':form})
    


@login_required
def updated(request, projects_id):
    project = get_object_or_404(Project, id = projects_id)
    form = ProjectForm(request.POST or None, request.FILES or None, instance = project)
    if form.is_valid():
        form.save()
        messages.success(request,'parabéns...! Os dados do seu projeto foram autalizados com sucesso')
        return HttpResponseRedirect(reverse('projects_manager'))
    
    return render(request, 'manager/projects/form.html',{'form':form})


@login_required
def detele(request, projects_id):
    project = get_object_or_404(Project, id = projects_id)
    project.delete()
    messages.success(request,'O project foi deletado do seu banco de dados com sucesso....')
    return HttpResponseRedirect(reverse('projects:manager'))


#------------------------------------ TAREFA ---------------------------------------------------------


def tarefas(request, projects_id):
    projeto = get_object_or_404(Project, id = projects_id)     
    tarefas = Tarefa.objects.filter(projeto = projeto)
    if len(tarefas) > 0 :
        projeto.status = 'execução'
        projeto.save()
         
    try:
        avg_projects = int(tarefas.aggregate(Avg('complete_per'))['complete_per__avg'])
        projeto.complete_per = avg_projects  
        projeto.save()
    except:
        avg_projects = 0    
    return render(request, 'manager/tarefa/list.html',{'tarefas':tarefas,'project':projeto})


def tarefa(request, tarefas_id):
    tarefas = Tarefa.objects.all
    tarefa = get_object_or_404(Tarefa, id = tarefas_id)   
    return render(request, 'manager/tarefa/conteudo.html',{'tarefas':tarefas,'tarefa':tarefa})



@login_required
def created_tarefa(request,projects_id):
    projetos = Project.objects.all()
    tarefas = Tarefa.objects.filter(projeto = projects_id)    
    if request.method == 'POST':
        titulo = request.POST.get("titulo").capitalize()
        descricao = request.POST.get("descricao").capitalize()
        projeto = request.POST.get("projeto")
        assign = request.POST.get("colaboradores")
        pre_requisitos = request.POST.getlist("pre_requisito")
        ids_requisitos = list(map(int, pre_requisitos))
        projeto = Project.objects.get(id=projeto)

        try:
            if tarefa.complete_per <= 0:
                tarefa.complete_per = tarefa.complete_per            

        except:
            complete_per = 0

        tarefa = Tarefa(
            titulo=titulo,
            descricao=descricao,
            projeto=projeto,
            complete_per = complete_per,           
        )
        tarefa.save()

        if len(ids_requisitos):
            for id_requisito in ids_requisitos:
                requisito = Tarefa.objects.get(id=id_requisito)
                tarefa.pre_requisitos.add(requisito)      

        return HttpResponseRedirect(reverse('tarefas', args=[projects_id]))
        
    
    #return render(request, 'manager/tarefa/created.html', {'form':form, })
    return render(request, 'manager/tarefa/created.html',{'projetos':projetos,'tarefas':tarefas})



@login_required
def detele_tarefa(request, tarefas_id):
    tarefa = get_object_or_404(Tarefa, id = tarefas_id)
    tarefa.delete()
    messages.success(request,'A Tarefa foi deletado do seu banco de dados com sucesso....')
    return HttpResponseRedirect(reverse('tarefas', args=[tarefas_id] ))


@login_required
def updated_tarefas(request, tarefas_id):
    tarefa = get_object_or_404(Tarefa, id = tarefas_id)
    form = TarefaForm(request.POST or None, instance = tarefa)
    if form.is_valid():
        form.save()
        messages.success(request,'parabéns...! Os dados do seu Modulo foram autalizados com sucesso')
        return HttpResponseRedirect(reverse('conteudo', args=[tarefas_id]))
    
    return render(request, 'manager/tarefa/updated.html',{'form':form, 'tarefa':tarefa })




@login_required
def iniciar_tarefa(request, id_tarefa):
    tarefa = Tarefa.objects.get(id=id_tarefa)
    pre_requisitos = tarefa.pre_requisitos.all()

    if len(pre_requisitos):
        for requisito in pre_requisitos:
            print(requisito.status)
            if requisito.status != '3':
                messages.info(request,'Esta tarefa possui pré-requisitos, conclua-os primeiro.')
            else:
                tarefa.iniciar()
    else:
        tarefa.iniciar()
    return HttpResponseRedirect(reverse('conteudo', args=[id_tarefa]))


def pausar_tarefa(request, id_tarefa):
    tarefa = Tarefa.objects.get(id=id_tarefa)
    tarefa.pausar()
    return HttpResponseRedirect(reverse('conteudo', args=[id_tarefa]))



def concluir_tarefa(request, id_tarefa):
    tarefa = Tarefa.objects.get(id=id_tarefa)
    tarefa.complete_per = 100    
    tarefa.data_conclusao = datetime.now()
    tarefa.save()
    tarefa.concluir()
    return HttpResponseRedirect(reverse('conteudo', args=[id_tarefa]))


def permissao_iniciar(request, id_tarefa):
    tarefa = Tarefa.objects.get(id=id_tarefa)
    return JsonResponse({"permitido": tarefa.permitido_iniciar})


def etapa_conluida(request, id_tarefa):
    tarefa = Tarefa.objects.get(id=id_tarefa)
    tarefa.complete_per += 10
    tarefa.save()
    return HttpResponseRedirect(reverse('conteudo', args=[id_tarefa]))



def timeline(request, projects_id):
    projeto = get_object_or_404(Project, id = projects_id)
    tarefas = Tarefa.objects.filter(projeto = projeto)
    return render(request,'manager/tarefa/timeline.html',{'tarefas':tarefas, 'projeto':projeto })
