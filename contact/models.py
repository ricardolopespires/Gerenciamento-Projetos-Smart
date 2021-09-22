from django.db import models

# Create your models here.






class Contact(models.Model):
    nome = models.CharField(max_length = 150  )
    email = models.EmailField(max_length = 190 )    
    assunto = models.CharField(max_length = 150 )
    messagem = models.TextField()
    created = models.DateTimeField(auto_now_add = True)


    def __str__(self):
        return self.nome


class Newsletter(models.Model):
    email = models.EmailField(max_length=190, blank=True)

    def __str__(self):
        return self.email