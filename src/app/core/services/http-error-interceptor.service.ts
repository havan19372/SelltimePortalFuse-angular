import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { ErrorBroadcastingService } from './error-broadcasting.service';
import { SweetAlertService } from './sweet-alert.service';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(
    private errorBroadcast: ErrorBroadcastingService,
    private notify: SweetAlertService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).catch((err: HttpErrorResponse) => {
      debugger;
      if (err.status === 400) {
        this.errorBroadcast.http400.next(err);
      }

      if (err.status === 404) {
        this.errorBroadcast.http404.next(err);
      }

      if (err.status === 500) {
        this.errorBroadcast.http500.next(err);
        // sawy violation error ! :D
      }

      if (err.status === 422) {
        debugger;
        this.notify.showError(
          err.status.toString(),
          err.message ? err.message : err.error
        );
      }

      return Observable.of(new HttpResponse(err));
    });
  }
}
