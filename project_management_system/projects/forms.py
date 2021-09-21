from django import forms
from .models import Project, Tarefa





class ProjectForm(forms.ModelForm):

    forms.CharField(widget=forms.Textarea)
    
    class Meta:
        model = Project
        fields = ('__all__')



class TarefaForm(forms.ModelForm):

    class Meta:
        model = Tarefa
        fields = ['titulo','descricao','projeto', 'complete_per']
