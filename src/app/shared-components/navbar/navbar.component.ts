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

  // This boolean property tracks whether the menu is open or closed
  isMenuOpen: boolean = false;

  // This array defines the navigation links with their paths and labels which is interpolated in a template
  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/rooms', label: 'Rooms' },
    { path: '/hotels', label: 'Hotels' },
    { path: '/booked-rooms', label: 'Booked Rooms' },
  ];

  // This method toggles the state of the menu between open and closed
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
