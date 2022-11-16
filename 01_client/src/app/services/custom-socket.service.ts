import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomSocketService {
  constructor(private socket: Socket) {}

  public getPrices$(): Observable<any> {
    return new Observable((observer) => {
      try {
        this.socket.on('connect', () => {
          console.log('Estamos contectados');
        });

        this.socket.on('push', (data: any) => {
          console.log('traimos data');
          observer.next(data);
        });

        this.socket.on('disconnect', () => {
          console.log('Nos hemos desconectado del servidor');
          observer.complete();
        });

        this.socket.on('error', (err: any) => {
          observer.error(err);
          console.log('Hemos tenido un error');
        });

        this.socket.on('connect_error', (err: any) => {
          observer.error(err);
          console.log('este es un error de conexión');
        });
      } catch (err) {
        observer.error(err);
      }
    });
  }
}
