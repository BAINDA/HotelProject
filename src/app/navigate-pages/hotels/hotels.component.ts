import { Component, OnInit } from '@angular/core'; // Import Angular core modules for component functionality.
import { ApiService } from '../../services/api.service'; // ApiService to fetch hotel data from the backend.
import { Hotels } from '../../interfaces/hotels-interface'; // Interface for hotel data structure.

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
  constructor(private apiService: ApiService) {} // Inject ApiService for API calls.

  hotels: Hotels[] = []; // Store fetched hotel data.

  errorMessage: string | null = null; // Store error message in case of a failed request.

  ngOnInit(): void {
    // Initialize component and fetch all hotels.
    this.getAllHotels();
  }

  // Fetch all hotels from the API and handle success or error responses.
  getAllHotels() {
    this.apiService.fetchData<Hotels[]>('/Hotels/GetAll').subscribe({
      next: (data) => {
        this.hotels = data; // Assign fetched data to the hotels array.
        this.errorMessage = null; // Clear any previous errors if the request is successful.
      },
      error: (error) => {
        this.errorMessage = error; // Store error message if request fails.
      },
    });
  }
}
