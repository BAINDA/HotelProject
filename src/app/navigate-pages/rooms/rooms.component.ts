import { Component } from '@angular/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent {}
