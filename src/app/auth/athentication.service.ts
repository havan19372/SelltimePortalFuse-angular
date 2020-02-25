import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { UserModel } from './user.model';
@Injectable()
export class AuthenticationService {
  user: UserModel;
  baseUrl = environment.DevApiUrl;
  tokenStorageKey = environment.lclStrg_Auth_Key;

  constructor(private http: HttpClient) {}

  register(user): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}/user`, user, httpOptions);
  }

  login(user): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}/RequestToken`, user, httpOptions);
  }

  logout() {
    return localStorage.removeItem(this.tokenStorageKey);
  }

  updateUserToken(userCred: UserModel) {
    this.user=userCred;
    localStorage.setItem(this.tokenStorageKey, JSON.stringify(userCred));
  }


  getUserToken(): UserModel {
    this.user = JSON.parse(localStorage.getItem(this.tokenStorageKey));
    if (this.user) {
      if (!this.user.imageUrl) {
        this.user.imageUrl = '/assets/images/avatars/profile.jpg';
      }
      try {
        if (new Date() > this.user.expireDate) {
          // TODO: Refresh token if expired
        }
      } catch (ex) {
        this.user = <UserModel>{
          fullName: '',
          token: '',
          imageUrl: '',
          expireDate: null
        };
      }
      return this.user;
    }
  }

  removeUserToken() {
    // TODO: Remove token from serve
    return localStorage.removeItem(this.tokenStorageKey);
  }

  isLoggedIn(): boolean {
    this.user = JSON.parse(localStorage.getItem(this.tokenStorageKey));
    if (!this.user) {
      return false;
    }
    if (new Date() > new Date(this.user.expireDate)) {
      // TODO: Refresh token if expired
      return false;
    }

    return true;
  }

  // Roles 

  isAdmin(): boolean {
    this.user = JSON.parse(localStorage.getItem(this.tokenStorageKey));
    if (!this.user) {
      return false;
    }
    if (this.user.roles.filter(c=>c==='administrator').length >0) {
      // TODO: Refresh token if expired
      return true;
    }
    return false;

  }
}
