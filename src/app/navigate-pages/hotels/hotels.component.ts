import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Hotels } from '../../interfaces/hotels-interface';

@Component({
  selector: 'app-hotels',
  standalone: true,
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
  hotels: Hotels[] = []; // Array to hold all hotels
  errorMessage: string | null = null; // Property to hold error messages

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllHotels(); // Fetch hotels when the component initializes
  }

  // Fetch hotels from the API and handle responses
  getAllHotels() {
    this.apiService.fetchData<Hotels[]>('/Hotels/GetAll').subscribe({
      next: (data) => {
        this.hotels = data; // Set fetched data to hotels array
        this.errorMessage = null; // Clear any previous errors
      },
      error: (error) => {
        this.errorMessage = error; // Store error message if request fails
      },
    });
  }
}
