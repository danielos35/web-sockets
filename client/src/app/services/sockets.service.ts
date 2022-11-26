import { EventEmitter, Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SocketsService extends Socket {
  @Output() outEven: EventEmitter<any> = new EventEmitter();

  constructor(public cookieService: CookieService) {
    super({
      url: 'http://localhost:3000',
      options: {
        query: {
          nameRoom: cookieService.get('room'),
        },
      },
    });
    this.listen();
  }

  listen = () => {
    this.ioSocket.on('event', (res: any) => this.outEven.emit(res));
  };

  emitEvent = (payload = {}) => {
    this.ioSocket.emit('event', payload);
  };
}
