import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorBroadcastingService {
  public http404: BehaviorSubject<HttpErrorResponse>;
  public http500: BehaviorSubject<HttpErrorResponse>;
  public http400: BehaviorSubject<HttpErrorResponse>;

  constructor() {
    this.http404 = new BehaviorSubject<HttpErrorResponse>(null);
    this.http400 = new BehaviorSubject<HttpErrorResponse>(null);
    this.http500 = new BehaviorSubject<HttpErrorResponse>(null);
  }
}
