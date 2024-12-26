import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  confirmCancelBooking(): Promise<any> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        actions: 'swal2-actions',
      },
      buttonsStyling: false,
    });
    return swalWithBootstrapButtons.fire({
      title: 'Are you sure you want to cancel the booking?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it!',
      reverseButtons: true,
    });
  }
}
