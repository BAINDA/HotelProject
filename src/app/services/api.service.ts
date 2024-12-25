import { HttpClient } from '@angular/common/http'; // HttpClient for sending HTTP requests.
import { Injectable } from '@angular/core'; // Injectable decorator to make this service accessible app-wide.
import { Observable } from 'rxjs'; // Observable to handle asynchronous responses.

@Injectable({
  providedIn: 'root', // Makes ApiService available throughout the app.
})
export class ApiService {
  constructor(private http: HttpClient) {} // Inject HttpClient to make requests.

  private baseUrl: string = 'https://hotelbooking.stepprojects.ge/api'; // Base URL for API requests.

  // Generic method to fetch data from any endpoint.
  fetchData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`); // Send GET request and return Observable.
  }

  // Fetch room details by room ID.
  getRoomById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Rooms/GetRoom/${id}`); // Send GET request for a specific room.
  }

  getAvailableRooms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Rooms/GetAvailableRooms`);
  }
}
