import { HttpClient } from '@angular/common/http'; // We use HttpClient to send requests to the backend API.
import { Injectable } from '@angular/core'; // Injectable makes this service available to the rest of the app.
import { Observable } from 'rxjs'; // Observable is used for handling asynchronous data responses.

@Injectable({
  providedIn: 'root', // This tells Angular to make ApiService available throughout the entire app.
})
export class ApiService {
  // The constructor takes HttpClient, so we can use it to make requests from within our methods.
  constructor(private http: HttpClient) {}

  // Here’s our base URL. Any request to the API will start from this URL.
  private baseUrl: string = 'https://hotelbooking.stepprojects.ge/api';

  // This is a flexible method that can fetch any kind of data, based on the endpoint you provide.
  // The <T> is a placeholder for whatever data type you want the result to be (like favoriteRooms[] or Hotels[]).
  fetchData<T>(endpoint: string): Observable<T> {
    // We build the full URL by appending the provided endpoint to the base URL.
    // This will return an Observable, which Angular will use to handle the async data when the server responds.
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }
}
