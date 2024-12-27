import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RoomDetails, RoomImage } from '../../interfaces/rooms-interface';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { BookingResponse } from '../../interfaces/booking-interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SliderComponent } from '../../components/slider/slider.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [
    NgFor,
    CurrencyPipe,
    NgIf,
    FormsModule,
    SliderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit {
  // Define room features with icons and descriptions
  roomFeatures: { icon: string; description: string }[] = [
    { icon: 'fa-solid fa-bed', description: 'Double Bed' },
    { icon: 'fa-solid fa-wifi', description: 'Free Wi-Fi' },
    { icon: 'fa-regular fa-newspaper', description: 'Free Newspaper' },
    { icon: 'fa-solid fa-sun', description: 'Beach View' },
    { icon: 'fa-solid fa-users', description: '2 Guests ' },
    { icon: 'fa-solid fa-bacon', description: 'Breakfast Included' },
    { icon: 'fa-solid fa-window-maximize', description: 'Private Balcony' },
    { icon: 'fa-solid fa-tv', description: 'Flat-Screen TV' },
    { icon: 'fa-solid fa-hot-tub', description: 'Jacuzzi' },
    { icon: 'fa-solid fa-fan', description: 'Air Conditioning' },
    { icon: 'fa-solid fa-cocktail', description: 'Mini Bar' },
    { icon: 'fa-solid fa-concierge-bell', description: 'Room Service' },
  ];

  roomsDetails: RoomDetails | null = null; // Holds room details fetched from the API
  roomsImages: string[] = []; // Holds room images fetched from the API
  currentDate: string = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format\
  postForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute, // ActivatedRoute to get route parameters
    private apiService: ApiService, // ApiService for API requests
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formData(); // Initialize the form first
    this.activatedRoute.params.subscribe((params) => {
      // Get room ID from route parameters
      const roomId = params['id'];
      // Fetch room details based on room ID
      this.getRoomDetails(roomId);
    });
  }

  // Fetch room details based on room ID
  getRoomDetails(roomId: number) {
    this.apiService.getRoomById(roomId).subscribe({
      next: (data) => {
        this.roomsDetails = data; // Set room details if request is successful
        this.roomsImages = data.images.map((image: RoomImage) => image.source); // Map RoomsImage[] to string[]
        console.log(this.roomsDetails); // Log room details for
        // debugging
        this.cdRef.detectChanges(); // Detect changes to update the view
      },
      error: (error) => {
        console.error('Error fetching room details', error); // Log error if request fails
      },
    });
  }

  formData() {
    this.postForm = new FormGroup({
      checkIn: new FormControl('', Validators.required),
      checkOut: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      userPhone: new FormControl('', Validators.required),
    });
  }

  postRoomBooking(): void {
    if (this.postForm.invalid) {
      return;
    }

    const bookingDetails: BookingResponse = {
      id: 0, // Default value, will be set by the server
      roomID: this.roomsDetails!.id,
      checkInDate: this.postForm.value.checkIn,
      checkOutDate: this.postForm.value.checkOut,
      totalPrice: 0, // Default value, will be calculated by the server
      isConfirmed: false, // Default value, will be set by the server
      customerName: this.postForm.value.userName,
      customerId: '', // Default value, should be set appropriately
      customerPhone: this.postForm.value.userPhone,
    };

    this.apiService.bookingRoom(bookingDetails).subscribe({
      next: (response: string) => {
        // Assuming the response is plain text
        console.log('Booking response:', response);

        if (response.includes('Booking retrieved successfully')) {
          Swal.fire({
            title: 'Booking Successful!',
            text: `You have successfully booked the room: ${this.roomsDetails?.name}. 
                   Your total price per night is: ${this.roomsDetails?.pricePerNight} USD.`,
            imageUrl: this.roomsImages[0] || 'https://unsplash.it/400/200',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Room Image',
            confirmButtonText: 'Close',
          });

          // Reset the form after booking
          this.postForm.reset();
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue with your booking.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
      error: (error) => {
        console.error('Booking error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue with your booking.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
