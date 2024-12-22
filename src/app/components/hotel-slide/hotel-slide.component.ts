import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotel-slide',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hotel-slide.component.html',
  styleUrls: ['./hotel-slide.component.css'],
})
export class HotelSlideComponent {
  // Property to hold the image source for the slider
  sliderImg: string = 'slide-bg.jpg';
  // Property to hold the alt text for the slider image
  sliderImgAlt: string = 'Hotel Slide Image';
}
