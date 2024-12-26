import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingResponse } from '../interfaces/booking-interface';
import { RoomDetails } from '../interfaces/rooms-interface';
import { Hotels } from '../interfaces/hotels-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Base URL for API requests

  private baseUrl: string = 'https://hotelbooking.stepprojects.ge/api';

  constructor(private http: HttpClient) {}

  // Fetch a list of favorite rooms
  getFavoriteRooms(): Observable<RoomDetails[]> {
    return this.http.get<RoomDetails[]>(`${this.baseUrl}/Rooms/GetAll`);
  }

  // Fetch a list of all hotels
  getAllHotels(): Observable<Hotels[]> {
    return this.http.get<Hotels[]>(`${this.baseUrl}/Hotels/GetAll`);
  }

  // Fetch details of a specific room by its ID
  getRoomById(id: number): Observable<RoomDetails> {
    // Send a GET request to fetch details of a specific room by its ID
    return this.http.get<RoomDetails>(`${this.baseUrl}/Rooms/GetRoom/${id}`);
  }

  // Fetch a list of all available rooms
  getAvailableRooms(): Observable<RoomDetails[]> {
    // Send a GET request to fetch all available rooms
    return this.http.get<RoomDetails[]>(
      `${this.baseUrl}/Rooms/GetAvailableRooms`
    );
  }

  // Book a room with the provided booking details
  bookingRoom(bookingDetails: BookingResponse): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(
      `${this.baseUrl}/Booking`,
      bookingDetails
    );
  }
}
