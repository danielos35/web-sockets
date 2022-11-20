import { Component, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
})
export class DrawComponent {
  @ViewChild('canvasRef', { static: false }) canvasRef: any;

  public width = 800;
  public height = 800;

  /*
    Opcion nativa, 
  */
  private cd!: CanvasRenderingContext2D;
  private cordenadas!: Array<any>;

  /*
    Escuchar evento
  */

  @HostListener('documnet:mousemove', ['$event'])
  onMousemove = (evento: any) => {
    if (evento.target.id === 'canvasId') {
      console.log(evento);
    }
  };
}
