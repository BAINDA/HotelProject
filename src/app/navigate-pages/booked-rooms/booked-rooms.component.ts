import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BookingResponse } from '../../interfaces/booking-interface';
import { CurrencyPipe, DatePipe, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-booked-rooms',
  standalone: true,
  imports: [NgFor, DatePipe, CurrencyPipe, NgClass, FormsModule],
  templateUrl: './booked-rooms.component.html',
  styleUrl: './booked-rooms.component.scss',
})
export class BookedRoomsComponent implements OnInit {
  bookings: BookingResponse[] = [];
  filteredBookings: BookingResponse[] = [];
  searchTerm: string = '';

  constructor(
    private apiService: ApiService,
    private modalService: ModalService
  ) {}

  showModal(id: number) {
    this.modalService.confirmCancelBooking().then((result) => {
      if (result.isConfirmed) {
        this.cancelBooking(id);
      }
    });
  }

  getBookingDetails() {
    this.apiService.getBookings().subscribe((bookings: BookingResponse[]) => {
      this.bookings = bookings;
      this.filteredBookings = bookings;
      console.log(bookings);
    });
  }

  filterBookings() {
    this.filteredBookings = this.bookings.filter((booking) =>
      booking.customerName
        ?.toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  cancelBooking(id: number) {
    this.apiService.cancelBooking(id).subscribe({
      next: (response: string) => {
        // Log the response to ensure it's being handled correctly
        console.log('Response:', response);

        // If booking cancellation is successful, show success and refresh
        this.getBookingDetails();
        this.modalService.showSuccessMessage();
      },
      error: (error: HttpErrorResponse) => {
        // In case of error, log the error and show the error message
        console.error('Error response:', error);
        const errorMessage =
          error.error?.message ||
          'An error occurred while cancelling the booking.';
        this.modalService.showErrorMessage(errorMessage);
      },
    });
  }

  ngOnInit(): void {
    this.getBookingDetails();
  }
}
