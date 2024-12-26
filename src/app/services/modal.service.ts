import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  confirmCancelBooking(): Promise<any> {
    return Swal.fire({
      title: 'Are you sure you want to cancel the booking?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it!',
    });
  }

  showSuccessMessage(): void {
    Swal.fire({
      title: 'Cancelled!',
      text: 'Your booking has been cancelled.',
      icon: 'success',
    });
  }

  showErrorMessage(message: string): void {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
    });
  }
}
