import { Component } from '@angular/core';

import { FavoriteRoomsComponent } from '../../components/favorite-rooms/favorite-rooms.component';
import { UspSectionComponent } from '../../components/usp-section/usp-section.component';
import { BannerComponent } from '../../components/hotel-slide/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, FavoriteRoomsComponent, UspSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
