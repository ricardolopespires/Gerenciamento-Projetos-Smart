from django.shortcuts import render, reverse, HttpResponseRedirect, reverse
from .forms import ContactForm
from django.contrib import messages 

# Create your views here.



def contact(request):
    if request.method == 'POST':
        form = ContactForm( request.POST )
        if form.is_valid():
            form.save()
            messages.success(request, "Obrigado por entrar em contato conosco, responderemos em 48 horas....")
            return HttpResponseRedirect(reverse('contact:formulário'))

        else:
            messages.error(request, "As informações preenchida não estão corretamente...")

    else:
        form = ContactForm()    
    return render(request, 'contact/contato.html',{'form':form})
    





