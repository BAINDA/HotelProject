import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  busyService.busy();
  return next(req).pipe(
    // this delay is used for development purposes to simulate a slow network

    // delay(2000),
    finalize(() => busyService.idle())
  );
};
