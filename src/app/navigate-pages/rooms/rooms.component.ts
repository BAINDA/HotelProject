import { Component, OnInit } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Rooms } from '../../interfaces/rooms-interface';
import { ApiService } from '../../services/api.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [NgxSliderModule, CurrencyPipe],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  rooms: Rooms[] = [];
  filteredRooms: Rooms[] = [];

  selectedRoomType: string = '';
  selectedGuests: number = 1;
  checkInDate: string = '';
  checkOutDate: string = '';
  value: number = 0;
  highValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 1000,
  };
  currentDate: string = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    this.getAvailableRooms();
  }

  getAvailableRooms() {
    this.apiService.getAvailableRooms().subscribe((data) => {
      this.rooms = data;
      console.log(data);
    });
  }
}
