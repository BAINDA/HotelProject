import { Component } from '@angular/core';
import { HotelSlideComponent } from '../hotel-slide/hotel-slide.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HotelSlideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
