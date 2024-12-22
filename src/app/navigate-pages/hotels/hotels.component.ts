import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Hotels } from '../../interfaces/hotels-interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  // Inject ApiService in constructor to make HTTP requests
  constructor(private apiService: ApiService) {}

  // Array to hold all hotels data
  Hotels: Hotels[] = [];
  // Variable to hold error messages
  errorMessage: string | null = null;

  // Lifecycle hook that runs after component initialization
  ngOnInit(): void {
    // Fetch all hotels when the component is initialized
    this.getAllHotels();
  }

  // Method to fetch all hotels from the API
  getAllHotels() {
    this.apiService.getAllHotels().subscribe({
      // Handle successful response
      next: (hotels: Hotels[]) => {
        console.log(hotels);
        this.Hotels = hotels;
        this.errorMessage = null; // Clear any previous error messages
      },
      // Handle error response
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.getErrorMessage(error); // Set error message
        console.error('Error fetching hotels:', error); // Log error to console
      },
    });
  }

  // Method to generate a user-friendly error message
  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      return `An error occurred: ${error.error.message}`;
    } else {
      // Backend error
      return `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
  }
}
