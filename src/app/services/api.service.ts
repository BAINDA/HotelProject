import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://hotelbooking.stepprojects.ge/api';

  getFavoriteRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Rooms/GetAll`);
  }
}
