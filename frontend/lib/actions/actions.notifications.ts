// ws/NotificationWebSocket.ts
type NotificationType = 'system' | 'message' | 'alert' | 'task' | 'marketing';

export interface Notification {
  id?: string;
  title: string;
  message: string;
  notification_type: NotificationType;
  created_at: string;
  is_read?: boolean;
}

class NotificationWebSocket {
  private socket: WebSocket;
  private readonly url: string;
  private onMessageCallback?: (notification: Notification) => void;

  constructor() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    this.url = `${protocol}://${window.location.host}/ws/notifications/`;
    this.socket = this.connect();
  }

  private connect(): WebSocket {
    const ws = new WebSocket(this.url);

    ws.onopen = () => {
      console.log('[WS] Conectado ao servidor de notificações');
    };

    ws.onopen = () => {
    console.log('✅ WebSocket conectado com sucesso!');
  };


    ws.onmessage = (event: MessageEvent) => {
      const data: Notification = JSON.parse(event.data);
      console.log('[WS] Notificação recebida:', data);

      if (this.onMessageCallback) {
        this.onMessageCallback(data);
      }
    };

    ws.onclose = () => {
      console.warn('[WS] Conexão fechada. Tentando reconectar em 5s...');
      setTimeout(() => this.connect(), 5000);
    };

    ws.onerror = (error) => {
      console.error('[WS] Erro:', error);
      ws.close();
    };

    return ws;
  }

  public onMessage(callback: (notification: Notification) => void) {
    this.onMessageCallback = callback;
  }

  public close() {
    this.socket.close();
  }
}

export default NotificationWebSocket;
