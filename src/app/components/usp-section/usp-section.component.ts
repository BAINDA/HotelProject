import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-usp-section',
  standalone: true,
  imports: [NgFor],
  templateUrl: './usp-section.component.html',
  styleUrl: './usp-section.component.css',
})
export class UspSectionComponent {
  uspItems = [
    {
      icon: 'fa-martini-glass-citrus',
      title: 'Beverages included',
      description:
        'Enjoy a variety of refreshing drinks with every order, adding extra satisfaction.',
      link: '#',
    },
    {
      icon: 'fa-credit-card',
      title: 'Stay First, Pay After!',
      description:
        'Experience first, pay later — enjoy flexibility and convenience with our payment option',
      link: '#',
    },
    {
      icon: 'fa-cutlery',
      title: '24 Hour Restaurant',
      description:
        'Delicious meals available 24/7, ready to satisfy your cravings anytime.',
      link: '#',
    },
    {
      icon: 'fa-tint',
      title: 'Spa Included!',
      description:
        'Relax and unwind with a soothing spa experience included with your stay',
      link: '#',
    },
  ];
}
