import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService } from '../../core/services/api.service';
import { User } from './user.model';

@Injectable()
export class UserService implements Resolve<any> {
  routeParams: any;
  user: any;
  onUserBehviorChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private apiSvc: ApiService) {}

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {
      Promise.all([this.getUser()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onUserBehviorChanged.next(false);
        resolve(false);
      } else {
        this.apiSvc
          .get('User/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.user = response;
            this.onUserBehviorChanged.next(this.user);
            resolve(response);
          }, reject);
      }
    });
  }
  getUserList():any {
    return this.apiSvc.get(`User?PageNumber=1&PageSize=50`);
  } 
  saveUser(user) {
    return new Promise((resolve, reject) => {
      delete user['id'];

      this.apiSvc
        .put('User/' + this.routeParams.id, user)
        .subscribe((response: any) => {
          if (response.error) {
            // tslint:disable-next-line:no-debugger
           // debugger;
          } else {
            resolve(response);
          }
        }, reject);
    });
  }

  addUser(user) {
    return new Promise((resolve, reject) => {
      delete user['id'];

      this.apiSvc.post('User', user).subscribe((response: any) => {
        if (response.error) {
          // tslint:disable-next-line:no-debugger
         // debugger;
        } else {
          resolve(response);
        }
      }, reject);
    });
  }

  getSelectedUser(id:any){
    return this.apiSvc.get(`User/${id}`);
  }
  
  
}
