import { Component, OnInit } from '@angular/core'; // Angular imports for component and lifecycle hooks.
import { ApiService } from '../../services/api.service'; // ApiService for fetching data from the backend.
import { CurrencyPipe } from '@angular/common'; // CurrencyPipe for formatting currency in the template.
import { favoriteRooms } from '../../interfaces/favorite-room-interface'; // Type definition for favorite room data.

@Component({
  selector: 'app-favorite-rooms',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './favorite-rooms.component.html',
  styleUrl: './favorite-rooms.component.scss',
})
export class FavoriteRoomsComponent implements OnInit {
  favoriteRooms: favoriteRooms[] = []; // Array to hold fetched favorite room data.
  errorMessage: string | null = null; // Variable to store error message in case of failure.

  constructor(private apiService: ApiService) {} // Inject ApiService to make API calls.

  ngOnInit(): void {
    // Fetch favorite rooms as soon as the component initializes.
    this.getFavoriteRooms();
  }

  // Fetch favorite rooms from the API and handle success and error cases.
  getFavoriteRooms() {
    this.apiService.fetchData<favoriteRooms[]>('/Rooms/GetAll').subscribe({
      next: (data) => {
        // Limit the displayed rooms to the first 6 items.
        this.favoriteRooms = data.slice(0, 6);
        this.errorMessage = null; // Clear any previous errors.
      },
      error: (error) => {
        // Capture any error from the API request and display it.
        this.errorMessage = error;
      },
    });
  }
}
