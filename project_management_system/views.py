from django.shortcuts import render, HttpResponseRedirect, reverse
from contact.forms import NewsletterForm
from django.contrib import messages





def index(request):
    if request.method == 'POST':
        form = NewsletterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Obrigado por escrever no canal de Notícias!!!!")
            return HttpResponseRedirect(reverse('index'))
    
        else:
            messages.error(reuqest, 'O seu email esta incorreto, por favor verificar os dados....')

    else:
        form = NewsletterForm()
    return render (request, 'initial/index.html', {'form':form})




def about(request):
    return render(request, 'initial/about.html')