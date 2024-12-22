import { Component } from '@angular/core';
import { HotelSlideComponent } from '../../components/hotel-slide/hotel-slide.component';
import { FavoriteRoomsComponent } from '../../components/favorite-rooms/favorite-rooms.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HotelSlideComponent, FavoriteRoomsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
