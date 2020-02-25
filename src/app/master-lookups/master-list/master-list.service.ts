import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs/Observable';
import { MasterLookup } from '../master-lookup.model';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Subscription } from 'rxjs/Subscription';
import { SweetAlertService } from '../../core/services/sweet-alert.service';

import * as _ from 'lodash';

@Injectable()
export class MasterListService {
  lookUps: MasterLookup[];
  onLookUpsChanged: BehaviorSubject<any> = new BehaviorSubject({});

  @BlockUI('masterListBlock') blockUIList: NgBlockUI;
  constructor(
    private apiSvc: ApiService,
    private sweetAlert: SweetAlertService
  ) {}

  getLookUps(): Subscription {
    return this.apiSvc.get(`Lookup/master/false`, null, false).subscribe(
      response => {
        // debugger;
        this.lookUps = response;
        this.onLookUpsChanged.next(this.lookUps);
        // this.blockUIList.stop();
      },
      error => {
        const errMsg = error.message
          ? error.message
          : error.status
            ? `${error.status} - ${error.statusText}`
            : 'Server error';

        this.sweetAlert.showError('Error', errMsg);
        return Observable.throw(errMsg);
      }
    );
  }

  addMasterLookups(lookup: MasterLookup): Subscription {
    this.blockUIList.start();
    return this.apiSvc.post('Lookup/master', lookup).subscribe(
      response => {
        debugger;
        this.sweetAlert.showSuccess(
          'Success',
          `${response.text} Added Successfully`
        );
        this.lookUps.push(response);
        this.onLookUpsChanged.next(this.lookUps);
        this.blockUIList.stop();
      },
      error => {
        const errMsg = error.message
          ? error.message
          : error.status
            ? `${error.status} - ${error.statusText}`
            : 'Server error';

        this.sweetAlert.showError('Error', errMsg);
        this.blockUIList.stop();
        return Observable.throw(errMsg);
      }
    );
  }

  editMasterLookups(lookup: MasterLookup, id: number): Subscription {
    this.blockUIList.start();
    return this.apiSvc.put(`Lookup/master`, lookup).subscribe(
      response => {
        // debugger;
        this.sweetAlert.showSuccess(
          'Success',
          `${lookup.text} Edited Successfully`
        );

      //  _.remove(this.lookUps, lc => lc.id === id);
        let itemIndex = this.lookUps.findIndex(item => item.id == response.id);
        this.lookUps[itemIndex] = response;
        
        this.onLookUpsChanged.next(this.lookUps);
        this.blockUIList.stop();
      },
      error => {
        const errMsg = error.message
          ? error.message
          : error.status
            ? `${error.status} - ${error.statusText}`
            : 'Server error';

        this.sweetAlert.showError('Error', errMsg);
        this.blockUIList.stop();
        return Observable.throw(errMsg);
      }
    );
  }

  deleteMaster(lookup: MasterLookup): Subscription {
    this.blockUIList.start();
    return this.apiSvc.delete(`Lookup/master/${lookup.id}/true`).subscribe(
      response => {
        // debugger;
        this.sweetAlert.showSuccess(
          'Success',
          `${lookup.text} Deleted Successfully`
        );

        _.remove(this.lookUps, lc => lc.id === lookup.id);

        this.onLookUpsChanged.next(this.lookUps);
        this.blockUIList.stop();
      },
      error => {
        const errMsg = error.message
          ? error.message
          : error.status
            ? `${error.status} - ${error.statusText}`
            : 'Server error';

        this.sweetAlert.showError('Error', errMsg);
        this.blockUIList.stop();
        return Observable.throw(errMsg);
      }
    );
  }

}
