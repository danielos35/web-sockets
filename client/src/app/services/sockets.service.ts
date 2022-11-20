import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketsService extends Socket {
  constructor() {
    super({
      // URL del back
      url: 'http://localhost:3000/',
    });
  }
}
