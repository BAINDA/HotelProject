import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Rooms } from '../../interfaces/rooms-interface';
import { ApiService } from '../../services/api.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [NgxSliderModule, CurrencyPipe, FormsModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  private roomsSubscription: Subscription = new Subscription(); // Track active subscriptions to avoid memory leaks
  rooms: Rooms[] = []; // Stores the original unfiltered rooms data fetched from the API
  filteredRooms: Rooms[] = []; // Stores the filtered rooms that are displayed to the user
  errorMessage: string | null = null; // Holds any error message for display

  // Variables for storing user-selected filters
  selectedRoomType: string = ''; // Selected room type (e.g., Single Room, Double Room)
  selectedGuests: number = 1; // Selected number of guests
  checkInDate: string = ''; // Selected check-in date
  checkOutDate: string = ''; // Selected check-out date
  value: number = 0; // Default low price for the price filter
  highValue: number = 1000; // Default high price for the price filter
  options: Options = {
    floor: 0, // Minimum value for the price slider
    ceil: 1000, // Maximum value for the price slider
  };
  currentDate: string = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format, used for date input

  // Default price range values to reset filters
  defaultLowPrice: number = 300;
  defaultHighPrice: number = 1000;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.initializeDates(); // Initialize check-in and check-out dates
    this.getAvailableRooms(); // Fetch all available rooms from the API
  }

  /**
   * Initializes the check-in and check-out dates to default values.
   * The check-in date is today, and the check-out date is the following day.
   */
  initializeDates() {
    const today = new Date();
    this.checkInDate = today.toISOString().split('T')[0];
    this.checkOutDate = new Date(today.setDate(today.getDate() + 1))
      .toISOString()
      .split('T')[0];
  }

  /**
   * Fetches all available rooms from the API and stores them in `rooms` and `filteredRooms`.
   * This method will handle errors and show an appropriate error message.
   */
  getAvailableRooms() {
    this.roomsSubscription.add(
      this.apiService.getAvailableRooms().subscribe({
        next: (data) => {
          this.rooms = data; // Store the original data
          this.filteredRooms = [...data]; // Copy the data to `filteredRooms` for initial display
        },
        error: (err) => {
          console.error('Error fetching available rooms:', err);
          this.errorMessage =
            'Failed to load available rooms. Please try again later.'; // Show error message
          this.filteredRooms = []; // Clear the filtered rooms in case of error
        },
      })
    );
  }

  /**
   * Applies filters based on user-selected values (price range, room type, guest count, and dates).
   * The filtered rooms are updated in `filteredRooms` based on the current filter criteria.
   */
  applyFilters() {
    // Filter `rooms` array based on selected criteria and update `filteredRooms`
    this.filteredRooms = this.rooms.filter((room: any) => {
      // Filter by price range
      const isPriceInRange =
        room.pricePerNight >= this.value &&
        room.pricePerNight <= this.highValue;

      // Filter by selected room type
      const isRoomTypeSelected =
        !this.selectedRoomType ||
        room.roomTypeId === parseInt(this.selectedRoomType);

      // Filter by number of guests
      const isGuestCountValid = room.maximumGuests >= this.selectedGuests;

      // Filter by check-in and check-out dates
      const isDateAvailable = this.isRoomAvailable(room);

      console.log(
        `Room: ${room.roomTypeId}, Max Guests: ${room.maximumGuests}, Selected Guests: ${this.selectedGuests}, Is Guest Count Valid: ${isGuestCountValid}`
      );

      // Return true if all conditions are met, meaning the room matches the filters
      return (
        isPriceInRange &&
        isRoomTypeSelected &&
        isGuestCountValid &&
        isDateAvailable
      );
    });
  }

  /**
   * Checks if a room is available for the selected check-in and check-out dates.
   * This checks if the room has any booked dates that overlap with the selected dates.
   *
   * @param room - The room to check availability for
   * @returns True if the room is available for the selected dates, otherwise false
   */
  isRoomAvailable(room: any): boolean {
    if (!this.checkInDate || !this.checkOutDate) {
      return true; // If no dates are selected, consider the room as available
    }

    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);

    // Ensure `room.bookedDates` is an array and has valid data
    return (
      room.bookedDates?.every((bookedDate: any) => {
        const booked = new Date(bookedDate.date);
        return !(booked >= checkIn && booked <= checkOut);
      }) ?? true
    );
  }

  /**
   * Resets all filter values to their default state and re-fetches the rooms.
   * This essentially clears the filters and reloads all rooms.
   */
  resetFilters() {
    this.value = this.defaultLowPrice; // Reset to default low price
    this.highValue = this.defaultHighPrice; // Reset to default high price
    this.selectedRoomType = ''; // Reset room type filter
    this.selectedGuests = 1; // Reset guest count filter
    this.checkInDate = ''; // Reset check-in date
    this.checkOutDate = ''; // Reset check-out date
    this.getAvailableRooms(); // Re-fetch all rooms
  }

  /**
   * Unsubscribes from all subscriptions to prevent memory leaks when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.roomsSubscription.unsubscribe();
  }

  /**
   * Navigates to the room details page when the user clicks on "BOOK NOW".
   *
   * @param roomId - The ID of the selected room
   */
  navigateToRoomDetails(roomId: number) {
    this.router.navigate(['/room-details', roomId]); // Navigate to the room details page
  }
}
