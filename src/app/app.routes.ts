import { Routes } from '@angular/router';
import { HomeComponent } from './navigate-pages/home/home.component';
import { RoomsComponent } from './navigate-pages/rooms/rooms.component';
import { HotelsComponent } from './navigate-pages/hotels/hotels.component';
import { BookedRoomsComponent } from './navigate-pages/booked-rooms/booked-rooms.component';
import { RoomDetailsComponent } from './navigate-pages/room-details/room-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  { path: 'roomsdetail/:id', component: RoomDetailsComponent },
  {
    path: 'hotels',
    component: HotelsComponent,
  },
  {
    path: 'booked-rooms',
    component: BookedRoomsComponent,
  },
];
