import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  mensajes:string = '';
  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
  }
  
  enviarMensaje(){
    let mensajeInfo = {
      text:this.mensajes,
      typeMensaje:1
    }
    
    this.chatService.enviarMensaje(mensajeInfo); 
    this.mensajes = '';
  }
}
