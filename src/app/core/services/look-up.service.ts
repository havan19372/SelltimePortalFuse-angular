import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { LookUpModel } from '../lookUpCodes';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

@Injectable()
export class LookUpService {
  constructor(private ApiSvc: ApiService) {}
  getLookUpDetails(code:string): Observable<any> {
    return this.ApiSvc.get(`Lookup/detail/${code}/false`).map(
      response => response
    );
  }
}
