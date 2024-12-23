import { Component, OnInit } from '@angular/core';
import { Rooms } from '../../interfaces/rooms-interface'; // Type definition for room data.
import { ActivatedRoute } from '@angular/router'; // To access route parameters.
import { ApiService } from '../../services/api.service'; // Service for API calls.

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css',
})
export class RoomDetailsComponent implements OnInit {
  roomsDetails: Rooms | null = null; // Holds room details fetched from the API.

  constructor(
    private activatedRoute: ActivatedRoute, // ActivatedRoute to get route parameters.
    private apiService: ApiService // ApiService for API requests.
  ) {}

  ngOnInit(): void {
    const roomId = this.activatedRoute.snapshot.paramMap.get('id'); // Retrieve room ID from the URL.

    if (roomId) {
      this.getRoomDetails(+roomId); // Fetch room details if ID is found.
    }
  }

  // Fetch room details based on room ID.
  getRoomDetails(roomId: number) {
    this.apiService.getRoomById(roomId).subscribe({
      next: (data) => {
        this.roomsDetails = data; // Set room details if request is successful.
        console.log(data); // Log room details for debugging.
      },
      error: (error) => {
        console.error('Error fetching room details', error); // Log error if request fails.
      },
    });
  }
}
