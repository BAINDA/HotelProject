import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BookingResponse } from '../../interfaces/booking-interface';
import { CurrencyPipe, DatePipe, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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

  constructor(private apiService: ApiService) {}

  showModal() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure you want to cancel the booking?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled!',
            text: 'Your booking has been cancelled.',
            icon: 'success',
          });
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
    this.apiService.cancelBooking(id).subscribe(() => {
      this.getBookingDetails();
      console.log('Booking canceled successfully');
    });
  }

  ngOnInit(): void {
    this.getBookingDetails();
  }
}
