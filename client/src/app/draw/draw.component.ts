import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { SocketsService } from '../services/sockets.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
})
export class DrawComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  public isAvalible!: boolean;

  public width = 400;
  public height = 400;

  /*
    Opcion nativa, 
  */
  private cx!: CanvasRenderingContext2D | null;
  private cordenadas!: Array<any>;

  /*
    Escuchar evento
  */

  private points: Array<any> = [];

  constructor(private socket: SocketsService) {

    this.socket.outEven.subscribe((res) => {
      const { prevPost } = res;
      // this.writeSingle(prevPost, false);
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.preparaLienzo();
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove = (evento: any) => {
    if (evento.target.id === 'canvasId' && this.isAvalible) {
      this.escribir(evento);
    }
  };

  @HostListener('click', ['$event'])
  onClick = (evento: any) => {
    if (evento.target.id === 'canvasId') {
      this.isAvalible = !this.isAvalible;
    }
  };

  private preparaLienzo(): any {
    const canvasEl = this.canvasRef.nativeElement;

    // Llamar al contexto para dibujar
    this.cx = canvasEl.getContext('2d');
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    let number = 2;

    // Elemento posiblemente null
    // Ancho del pincel
    this.cx!.lineWidth = number;

    //Terminación de la linea
    this.cx!.lineCap = 'round';

    // Color de la linea
    this.cx!.strokeStyle = '#000';
  }

  escribir(res: any) {
    const canvasEl = this.canvasRef.nativeElement;

    // Obtener las dimensiones (ubicación en pixeles || coordenadas || posición)
    const rect = canvasEl.getBoundingClientRect();
    const prevPros = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top,
    };

    this.pintarDibujo(prevPros);
  }

  pintarDibujo(prePos: any, emit = true) {
    this.points.push(prePos);
    if (this.points.length > 3) {
      const prePos = this.points[this.points.length - 1];
      const currentPos = this.points[this.points.length - 2];
      this.pintarEnCanvas(prePos, currentPos);
      this.socket.emitEvent({ prePos });
    }
  }

  pintarEnCanvas(prePos: any, currentPos: any) {
    if (!this.cx) {
      return;
    }

    // Iniciar a pintar
    this.cx.beginPath();

    if (prePos) {
      this.cx.moveTo(prePos.x, prePos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);

      // dibujar
      this.cx.stroke();
    }
  }

  clearZone() {
    this.points = [];
    this.cx?.clearRect(0, 0, this.width, this.height);
  }
}
