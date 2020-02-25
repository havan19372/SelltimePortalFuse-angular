import { AuthenticationService } from 'app/auth/athentication.service';
import { environment } from './../../environments/environment';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RequestOptionsService extends BaseRequestOptions {
  tokenStorageKey = environment.lclStrg_Auth_Key;

  constructor( private authSvc: AuthenticationService) {
    super();
    this.headers.set('Content-Type', 'application/json');
  }
  merge(options?: RequestOptionsArgs): RequestOptions {
    const newOptions = super.merge(options);
    newOptions.headers.set('Authorization',
                           `Beaer ${this.authSvc.getUserToken().token}`);
    return newOptions;
  }
}