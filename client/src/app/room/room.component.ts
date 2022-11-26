import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  room!: string;

  constructor(
    private router: ActivatedRoute,
    private CookieService: CookieService
  ) {

  }

  ngOnInit(): void {
    this.room = this.router.snapshot.paramMap.get('room_number') || '';
    this.CookieService.set('room', this.room);
  }
}
