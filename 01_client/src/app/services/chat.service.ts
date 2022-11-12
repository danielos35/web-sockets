import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chat: any = [];
  constructor(public socketIO: SocketService) {
    this.recibirMensaje();
  }

  enviarMensaje(mensaje: any) {
    this.chat.push(mensaje);
    this.socketIO.io.emit('sendMessage', mensaje);
  }

  recibirMensaje() {
    this.socketIO.io.on('reciveMessage', (mensaje) => {
      mensaje.messageType = 2;
      this.chat.push(mensaje);
    });
  }
}
