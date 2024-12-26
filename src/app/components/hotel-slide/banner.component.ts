import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'banner.component.html',
  styleUrl: 'banner.component.scss',
})
export class BannerComponent {
  // Property to hold the image source for the slider
  sliderImg: string = 'slide-bg.jpg';
  // Property to hold the alt text for the slider image
  sliderImgAlt: string = 'Hotel Slide Image';
}
