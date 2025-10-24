



export const linksHome = [
   {id:1,url:'/',label:'Home',},
   {id:2,url:'#',label:'About',},
   {id:3,url:'#',label:'Feature',},
   {id:4,url:'#',label:'Testimonial',},
   {id:5,url:'/contact',label:'Contatos',},

  
]


export const accordionData = [
   {
      id: 1,
      title: 'Como funciona o onboarding e cadastro?',
      desc: 'O cadastro é feito pela interface web: crie uma conta com e-mail e senha, valide seu endereço de e-mail e complete o perfil com as informações obrigatórias (dados pessoais e perfil de investimento). Para integrar contas de corretora ou API externas, utilize a seção de integrações no painel do usuário.',
   },
   {
      id: 2,
      title: 'Quais planos e limites existem?',
      desc: 'Oferecemos planos gratuitos e pagos. O plano gratuito tem limites de chamadas à API e número de agentes simultâneos. Planos pagos ampliam limites, adicionam recursos (relatórios avançados, backtests, múltiplos agentes) e suporte prioritário. Consulte a página de preços para detalhes.',
   },
   {
      id: 3,
      title: 'Como a plataforma garante a segurança dos meus dados?',
      desc: 'Usamos HTTPS/TLS para todas as comunicações, armazenamento seguro de credenciais e práticas padrão de segurança. Tokens sensíveis não são comitados no repositório (ver `backend/backend/settings.py`); em produção, as credenciais devem vir de variáveis de ambiente ou de um cofre de segredos.',
   },
   {
      id: 4,
      title: 'Quais integrações externas a plataforma suporta?',
      desc: 'Atualmente oferecemos integrações com serviços REST e WebSocket, além de connectors para MetaTrader (veja `backend/metatrader/`), e suporte à conexão via APIs de corretoras. Para fila/processing usamos Redis (Channels, Celery/Huey).',
   },
   {
      id: 5,
      title: 'Como são processadas tarefas assíncronas e notificações?',
      desc: 'O sistema utiliza Huey para tarefas definidas em apps (ex.: `technical/tasks.py`) e também contém integração com Celery (`backend/backend/celery.py`) para jobs agendados; Redis é o broker padrão. Notificações usam o app `notifications` e endpoints sob `/api/v1/notifications/`.',
   },
   {
      id: 6,
      title: 'Onde encontro logs e como debugar problemas?',
      desc: 'Em desenvolvimento, logs aparecem no terminal do `runserver` e em `uvicorn` quando usado. Para Channels/ASGI use `uvicorn backend.asgi.application --reload`. Jobs de fila têm seus próprios logs (Huey/Celery). Consulte `backend/notes.md` para comandos rápidos.',
   },
   {
      id: 7,
      title: 'Como obter suporte ou reportar bugs?',
      desc: 'Abra uma issue no repositório com passos para reproduzir, logs relevantes e informações de ambiente (versões, comandos executados). Para suporte comercial, verifique o contato na página de Contatos ou envie e-mail para o time responsável.',
   }
]




export const data = [
  { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
  { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 },
  { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
  { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
  { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 },
  { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
  { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 },
  { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 },
  { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 },
  { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
  { open: 10.96, high: 11.90, low: 10.80, close: 11.50, time: 1643291876 },
  { open: 11.50, high: 12.00, low: 11.30, close: 11.80, time: 1643378276 },
  { open: 11.80, high: 12.20, low: 11.70, close: 12.00, time: 1643464676 },
  { open: 12.00, high: 12.50, low: 11.90, close: 12.30, time: 1643551076 },
  { open: 12.30, high: 12.80, low: 12.10, close: 12.60, time: 1643637476 },
  { open: 12.60, high: 13.00, low: 12.50, close: 12.90, time: 1643723876 },
  { open: 12.90, high: 13.50, low: 12.70, close: 13.20, time: 1643810276 },
  { open: 13.20, high: 13.70, low: 13.00, close: 13.50, time: 1643896676 },
  { open: 13.50, high: 14.00, low: 13.30, close: 13.80, time: 1643983076 },
  { open: 13.80, high: 14.20, low: 13.60, close: 14.00, time: 1644069476 }
];

