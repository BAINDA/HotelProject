import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { favoriteRooms } from '../interfaces/favorite-room-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://hotelbooking.stepprojects.ge/api';

  getFavoriteRooms(): Observable<any[]> {
    return this.http.get<favoriteRooms[]>(`${this.baseUrl}/Rooms/GetAll`);
  }
}
