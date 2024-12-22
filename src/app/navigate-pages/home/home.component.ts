import { Component, OnInit } from '@angular/core';
import { HotelSlideComponent } from '../../components/hotel-slide/hotel-slide.component';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HotelSlideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // Array to hold favorite rooms data
  favoriteRooms: any[] = [];
  // Variable to hold error messages
  errorMessage: string | null = null;

  // Using constructor to inject ApiService to make HTTP requests
  constructor(private apiService: ApiService) {}

  // Lifecycle hook that runs after component initialization

  ngOnInit(): void {
    // Fetch favorite rooms when the component is initialized
    this.getFavoriteRooms();
  }

  // Method to fetch favorite rooms from the API
  getFavoriteRooms() {
    this.apiService.getFavoriteRooms().subscribe({
      // Handle successful response
      next: (data) => {
        this.favoriteRooms = data;
        this.errorMessage = null; // Clear any previous error messages
      },
      // Handle error response
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.getErrorMessage(error); // Set error message
        console.error('Error fetching favorite rooms:', error); // Log error to console
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
