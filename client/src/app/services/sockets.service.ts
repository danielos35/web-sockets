import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SocketsService extends Socket {
  constructor(public cookieService: CookieService) {
    super({
      // URL del back
      url: 'http://localhost:3000/',
      options: {
        query: {
          nameRoom: cookieService.get('room'),
        },
      },
    });
  }

  emitEvent = (playLoad = {}) => {
    this.ioSocket.emit('event', playLoad);
  };
}
