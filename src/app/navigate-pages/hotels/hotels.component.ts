import { Component, OnInit } from '@angular/core'; // Angular core modules for component functionality.
import { ApiService } from '../../services/api.service'; // ApiService to fetch hotel data.
import { Hotels } from '../../interfaces/hotels-interface'; // Hotel data structure.

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
  constructor(private apiService: ApiService) {} // Inject ApiService for API calls.

  hotels: Hotels[] = []; // Holds fetched hotel data.

  errorMessage: string | null = null; // Stores error message on failure.

  ngOnInit(): void {
    this.getAllHotels(); // Fetch hotels when the component initializes.
  }

  // Fetch hotels from the API and handle responses.
  getAllHotels() {
    this.apiService.fetchData<Hotels[]>('/Hotels/GetAll').subscribe({
      next: (data) => {
        this.hotels = data; // Set fetched data to hotels array.
        this.errorMessage = null; // Clear any previous errors.
      },
      error: (error) => {
        this.errorMessage = error; // Store error message if request fails.
      },
    });
  }
}
