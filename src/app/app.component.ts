import { Component } from '@angular/core';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared-components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'HotelProject';
}
