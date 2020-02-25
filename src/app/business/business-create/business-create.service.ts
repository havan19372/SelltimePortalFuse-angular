import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ApiService } from '../../core/services/api.service';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MatSnackBar } from '@angular/material';
import { IBusinessModel } from '../business.model';

@Injectable()
export class BusinessCreateService implements Resolve<IBusinessModel> {
  Business: IBusinessModel;
  routeParams: { [key: string]: string };
  onBusinessChanged: BehaviorSubject<any> = new BehaviorSubject(IBusinessModel);
  constructor(private ApiSvc: ApiService, private snackBar: MatSnackBar) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.routeParams = route.params;
    return this.getBusiness();
  }
  
  getBusiness(): Observable<any> | BehaviorSubject<any> {
    if (this.routeParams.id === 'new') {
      this.onBusinessChanged.next(false);
      return null;
    } else {
      return this.ApiSvc.get(
        'business/' + this.routeParams.id + '/' + true
      ).map((res: IBusinessModel) => {
        
        res.id = +this.routeParams.id;
        this.onBusinessChanged.next(res);
        return res;
      });
    }
  }

  editBusiness(Business: IBusinessModel): Observable<any> {
    
    return this.ApiSvc.put('business/' + Business.id, Business).catch(
      this.handleError
    );
  }

  checkEmailUsername(value: string): Observable<any> {
    return this.ApiSvc.get(`User/EmailExsit/${value}`).catch(
      this.handleError
    );
  }

  addBusiness(Business: IBusinessModel): Observable<any> {
    // 
    return this.ApiSvc.post('business', Business).catch(
      this.handleError
    );
  }

  private handleError(error) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    this.snackBar.open(errMsg, 'OK', {
      verticalPosition: 'top',
      duration: 1000,
      panelClass: 'mat-red-bg'
    });
    return Observable.throw(errMsg);
  }

}
