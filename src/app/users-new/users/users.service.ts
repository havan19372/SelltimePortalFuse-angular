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
import { MemberModel } from 'app/members/member.model';


@Injectable()
export class UsersService implements Resolve<any> {
  users: any[];
  member: MemberModel;
  routeParams: any;
  onUsersChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onMemberChanged: BehaviorSubject<any> = new BehaviorSubject({});
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
      Promise.all([this.getUsers(1, 20), this.getMember()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getUsers(startValue, pageSize): Promise<any> {
    const pagenationData = {
      pageNumber: startValue,
      pageSize: pageSize
    };
    return new Promise((resolve, reject) => {
      this.apiSvc
        .get(
          `User?pageSize=${pagenationData.pageSize}&pageNumber=${
            pagenationData.pageNumber
          }&MemberId=${this.routeParams.memberId}`
        )
        .subscribe((response: any) => {

          this.users = response;
          console.log('users', this.users);
          this.onUsersChanged.next(this.users);
          resolve(response);
        }, reject);
    });
  }

  deleteUser(id): Promise<any> {

    return new Promise((resolve, reject) => {
      this.apiSvc
        .delete(
          `User/${id}/true`
        )
        .subscribe((response: any) => {

          resolve(response);
        }, reject);
    });
  }

  getMember(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url =
       'Member/' + this.routeParams.memberId;
      this.apiSvc.get(url).subscribe(response => {
        this.member = response;
        this.onMemberChanged.next(this.member);
        resolve(response);
      });
    });
  }

  checkEmailUsername(value: string): Observable<any> {
    return this.apiSvc.get(`User/EmailExsit/${value}`);
  }

}
