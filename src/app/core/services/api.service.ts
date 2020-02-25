import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from '../../auth/athentication.service';
import { environment } from '../../../environments/environment';
import { Product } from 'app/products/single/single.model';

@Injectable()
export class ApiService {
  private ApiUrl = environment.DevApiUrl;

  constructor(
    private httpClient: HttpClient,
    private authSvc: AuthenticationService
  ) { }

  get(url: string, body?: {}, includeHeader?: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authSvc.getUserToken().token
    });
    if (includeHeader) {
      return this.httpClient.get(`${this.ApiUrl}/${url}`, {
        headers: headers,
        withCredentials: true,
        observe: 'response'
      });
    } else {
      return this.httpClient.get(`${this.ApiUrl}/${url}`, {
        headers: headers,
        withCredentials: true
      });
    }
  }

  getFile(url: string) {
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authSvc.getUserToken().token,
      })
    };
    return this.httpClient.get(`${this.ApiUrl}/${url}`, httpOptions);
  }

  getProperty(url: string, body?: {}, includeHeader?: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authSvc.getUserToken().token
    });
    if (includeHeader) {
      return this.httpClient.get(`${this.ApiUrl}/${url}`, {
        headers: headers,
        withCredentials: true,
        observe: 'response'
      });
    } else {
      return this.httpClient.get(`${this.ApiUrl}/${url}`, {
        headers: headers,
        withCredentials: true
      });
    }
  }


  post(url: string, body: {}): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authSvc.getUserToken().token
    });
    console.log("body status", body)
    return this.httpClient.post(`${this.ApiUrl}/${url}`, body, {
      headers: headers,
      withCredentials: true
    });
  }

  postFile(url: string, body: {}): Observable<any> {
    return this.httpClient.post(`${this.ApiUrl}/${url}`, body, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getUserToken().token
      }),
      withCredentials: true
    });
  }

  put(url: string, body: {}): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authSvc.getUserToken().token
    });
    return this.httpClient.put(`${this.ApiUrl}/${url}`, body, {
      headers: headers,
      withCredentials: true
    });
  }

  Imageput(url: string, body: {}): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authSvc.getUserToken().token
    });
    return this.httpClient.put(`${url}`, body, {
      headers: headers,
      withCredentials: true
    });
  }

  delete(url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authSvc.getUserToken().token
    });
    let attachmentUrl = `${this.ApiUrl}/${url}`;
    return this.httpClient.delete(`${this.ApiUrl}/${url}`, {
      headers: headers,
      withCredentials: true
    });
  }
}
