import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [NgClass],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss',
})
export class BackToTopComponent {
  isVisible: boolean = false; // Property to track the visibility of the button

  // Listen for window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show the button when the user scrolls down 100px from the top
    this.isVisible = window.scrollY > 100;
  }

  // Method to scroll the window to the top
  scrollToTop(event: Event): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top with smooth behavior
  }
}
