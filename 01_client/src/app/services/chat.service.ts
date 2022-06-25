import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chat:any = [];
  constructor(private socketIO:SocketService ) {

    this.recibirMensaje()
   }
  

  enviarMensaje(mensaje:any){
    this.chat.push(mensaje); 
    this.socketIO.io.emit('Enviar mensaje', mensaje)
  }


  recibirMensaje(){
    this.socketIO.io.on("recibirMensaje",(mensaje)=>{
      this.chat.push(mensaje)
    })
  }
}
