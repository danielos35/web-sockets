import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  constructor(public socketIO: SocketService) {}

  data!: number;

  ngOnInit(): void {
    this.socketIO.io.on('data_graph', (res) => {
      this.data = res.data;
    });
  }
}
