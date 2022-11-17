import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  data!: number;
  multi!: any[];
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  colorScheme: any = {
    domain: ['#72efdd', '#ffd60a'],
  };

  constructor(public socketIO: SocketService) {
    this.multi = [
      {
        name: 'BTC',
        series: [
          {
            name: '200',
            value: 25000,
          },
          {
            name: '201',
            value: 32000,
          },
        ],
      },
      {
        name: 'ETH',
        series: [],
      },
    ];
  }

  ngOnInit(): void {
    this.socketIO.io.on('data_graph', (res) => {
      this.data = res.data;
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
