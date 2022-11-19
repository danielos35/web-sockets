import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-one',
  templateUrl: './room-one.component.html',
  styleUrls: ['./room-one.component.scss'],
})
export class RoomOneComponent implements OnInit {
  room!: string | null;
  constructor(private route: ActivatedRoute) {
    this.room = this.route.snapshot.paramMap.get('data');
    console.log(this.room);
  }

  ngOnInit(): void {}
}
