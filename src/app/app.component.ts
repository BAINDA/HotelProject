import { Component } from '@angular/core';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared-components/footer/footer.component';
import { Router, NavigationEnd } from '@angular/router';
import { BackToTopComponent } from './shared-components/back-to-top/back-to-top.component';
import { BusyService } from './services/busy.service';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
    BackToTopComponent,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, public busyService: BusyService) {}

  ngOnInit() {
    // Scroll to top on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
