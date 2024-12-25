import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Rooms } from '../../interfaces/rooms-interface';
import { ApiService } from '../../services/api.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [NgxSliderModule, CurrencyPipe, FormsModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  private roomsSubscription: Subscription = new Subscription(); // Track subscriptions
  rooms: Rooms[] = [];
  filteredRooms: Rooms[] = [];
  errorMessage: string | null = null;

  selectedRoomType: string = '';
  selectedGuests: number = 1;
  checkInDate: string = '';
  checkOutDate: string = '';
  value: number = 0; // Use default low price value
  highValue: number = 1000; // Use default high price value
  options: Options = {
    floor: 0,
    ceil: 1000,
  };
  currentDate: string = new Date().toISOString().split('T')[0];

  // Default filter values
  defaultLowPrice: number = 300;
  defaultHighPrice: number = 1000;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.initializeDates();
    this.getAvailableRooms();
  }

  // Initialize check-in and check-out dates with default values
  initializeDates() {
    const today = new Date();
    this.checkInDate = today.toISOString().split('T')[0];
    this.checkOutDate = new Date(today.setDate(today.getDate() + 1))
      .toISOString()
      .split('T')[0];
  }

  // Fetch all rooms
  getAvailableRooms() {
    this.roomsSubscription.add(
      this.apiService.getAvailableRooms().subscribe({
        next: (data) => {
          this.rooms = data;
          this.filteredRooms = data; // Initialize filteredRooms with all rooms
        },
        error: (err) => {
          console.error('Error fetching available rooms:', err);
          this.errorMessage =
            'Failed to load available rooms. Please try again later.';
          this.rooms = []; // Clear rooms if error occurs
          this.filteredRooms = []; // Clear filtered rooms
        },
      })
    );
  }

  // Apply filters to the rooms
  applyFilters() {
    this.filteredRooms = this.rooms.filter((room: any) => {
      // Price filter
      const isPriceInRange =
        room.pricePerNight >= this.value &&
        room.pricePerNight <= this.highValue;

      // Room type filter
      const isRoomTypeSelected =
        !this.selectedRoomType ||
        room.roomTypeId === parseInt(this.selectedRoomType);

      // Guests filter
      const isGuestCountValid = room.maximumGuests >= this.selectedGuests;

      // Check-in and Check-out date filter
      const isDateAvailable = this.isRoomAvailable(room);

      console.log(
        `Room: ${room.roomTypeId}, Max Guests: ${room.maximumGuests}, Selected Guests: ${this.selectedGuests}, Is Guest Count Valid: ${isGuestCountValid}`
      );

      return (
        isPriceInRange &&
        isRoomTypeSelected &&
        isGuestCountValid &&
        isDateAvailable
      );
    });
  }
  // Check if the room is available for the selected dates
  isRoomAvailable(room: any): boolean {
    if (!this.checkInDate || !this.checkOutDate) {
      return true; // If no dates are selected, consider the room as available
    }

    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);

    // Ensure room.bookedDates is an array and has valid data
    return (
      room.bookedDates?.every((bookedDate: any) => {
        const booked = new Date(bookedDate.date);
        return !(booked >= checkIn && booked <= checkOut);
      }) ?? true
    );
  }

  // Reset all filters and re-fetch all rooms
  resetFilters() {
    this.value = this.defaultLowPrice; // Use default value for low price
    this.highValue = this.defaultHighPrice; // Use default value for high price
    this.selectedRoomType = '';
    this.selectedGuests = 1;
    this.checkInDate = '';
    this.checkOutDate = '';
    this.getAvailableRooms(); // Re-fetch all rooms
  }

  // Unsubscribe from all subscriptions to prevent memory leaks
  ngOnDestroy(): void {
    this.roomsSubscription.unsubscribe();
  }
}
