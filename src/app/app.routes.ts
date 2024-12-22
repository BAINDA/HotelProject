import { Routes } from '@angular/router';
import { HomeComponent } from './navigate-pages/home/home.component';
import { RoomsComponent } from './navigate-pages/rooms/rooms.component';
import { HotelsComponent } from './navigate-pages/hotels/hotels.component';
import { BookedRoomsComponent } from './navigate-pages/booked-rooms/booked-rooms.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  {
    path: 'hotels',
    component: HotelsComponent,
  },
  {
    path: 'booked-rooms',
    component: BookedRoomsComponent,
  },
];
