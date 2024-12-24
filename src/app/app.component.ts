import { Component } from '@angular/core';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared-components/footer/footer.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    // Subscribe to router events to perform actions on navigation end
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page immediately after navigation ends
        window.scrollTo(0, 0);
      }
    });
  }
}
