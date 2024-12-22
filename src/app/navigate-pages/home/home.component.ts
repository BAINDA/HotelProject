import { Component } from '@angular/core';
import { HotelSlideComponent } from '../../components/hotel-slide/hotel-slide.component';
import { FavoriteRoomsComponent } from '../../components/favorite-rooms/favorite-rooms.component';
import { UspSectionComponent } from '../../components/usp-section/usp-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HotelSlideComponent, FavoriteRoomsComponent, UspSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
