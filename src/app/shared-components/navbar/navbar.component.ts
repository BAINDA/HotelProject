import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // This property holds the source path for the logo image
  logoImg: string = 'logo.png';
  // This property holds the alt text for the logo image
  logoAlt: string = 'Website Logo';

  // This array defines the navigation links with their paths and labels which is interpolated in a template
  navLinks = [
    { path: '/', label: 'Main', icon: 'fa-house' },
    { path: '/rooms', label: 'Rooms', icon: 'fa-building' },
    { path: '/hotels', label: 'Hotels', icon: 'fa-hotel' },
    { path: '/booked-rooms', label: 'Booked', icon: 'fa-bookmark' },
  ];
}
