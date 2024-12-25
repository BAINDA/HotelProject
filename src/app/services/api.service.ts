import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../interfaces/booking-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Base URL for API requests
  private baseUrl: string = 'https://hotelbooking.stepprojects.ge/api';

  constructor(private http: HttpClient) {}

  // Generic method to fetch data from any endpoint
  fetchData<T>(endpoint: string): Observable<T> {
    // Send a GET request to the specified endpoint and return an Observable
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }

  // Fetch room details by room ID
  getRoomById(id: number): Observable<any> {
    // Send a GET request to fetch details of a specific room by its ID
    return this.http.get(`${this.baseUrl}/Rooms/GetRoom/${id}`);
  }

  // Fetch all available rooms
  getAvailableRooms(): Observable<any> {
    // Send a GET request to fetch all available rooms
    return this.http.get(`${this.baseUrl}/Rooms/GetAvailableRooms`);
  }

  bookingRoom(bookingDetails: Booking): Observable<any> {
    // Send a POST request with the booking details
    return this.http.post(`${this.baseUrl}/Booking`, bookingDetails);
  }
}
