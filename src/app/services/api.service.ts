import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { favoriteRooms } from '../interfaces/favorite-room-interface';
import { Hotels } from '../interfaces/hotels-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Inject HttpClient in a constructor to make HTTP requests
  constructor(private http: HttpClient) {}

  // Base URL for the API
  baseUrl: string = 'https://hotelbooking.stepprojects.ge/api';

  // Method to get favorite rooms from the API
  getFavoriteRooms(): Observable<favoriteRooms[]> {
    return this.http.get<favoriteRooms[]>(`${this.baseUrl}/Rooms/GetAll`);
  }

  // Method to get all hotels from the API
  getAllHotels(): Observable<Hotels[]> {
    return this.http.get<Hotels[]>(`${this.baseUrl}/Hotels/GetAll`);
  }
}
