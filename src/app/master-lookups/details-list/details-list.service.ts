import { Injectable } from "@angular/core";
import { MasterLookup } from "../master-lookup.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ApiService } from "../../core/services/api.service";
import { SweetAlertService } from "../../core/services/sweet-alert.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

import * as _ from "lodash";

@Injectable()
export class DetailsListService {
  detailsLookUps: MasterLookup[];
  onDetailsLookUpsChanged: BehaviorSubject<any> = new BehaviorSubject({});

  @BlockUI("masterListBlock")
  blockUIList: NgBlockUI;
  constructor(
    private apiSvc: ApiService,
    private sweetAlert: SweetAlertService
  ) {}

  clearData(): void {
    this.detailsLookUps = [];
    this.onDetailsLookUpsChanged.next(this.detailsLookUps);
  }

  getDetailsLookups(masterCode: string): Subscription {
    return this.apiSvc
      .get(`Lookup/detail/${masterCode}/false`, null, false)
      .subscribe(
        response => {
          if (response) {
            this.detailsLookUps = response;
          } else {
            this.detailsLookUps = [];
          }
          this.onDetailsLookUpsChanged.next(this.detailsLookUps);
          // this.blockUIList.stop();
        },
        error => {
          const errMsg = error.message
            ? error.message
            : error.status
              ? `${error.status} - ${error.statusText}`
              : "Server error";

          this.sweetAlert.showError("Error", errMsg);
          return Observable.throw(errMsg);
        }
      );
  }

  addDetailLookups(details: MasterLookup): Subscription {
    this.blockUIList.start();
    return this.apiSvc.post("Lookup/detail", details).subscribe(
      response => {
        this.detailsLookUps.push(response);
        this.onDetailsLookUpsChanged.next(this.detailsLookUps);
        this.blockUIList.stop();
      },
      error => {
        const errMsg = error.message
          ? error.message
          : error.status
            ? `${error.status} - ${error.statusText}`
            : "Server error";

        this.sweetAlert.showError("Error", errMsg);
        this.blockUIList.stop();
        return Observable.throw(errMsg);
      }
    );
  }

  deleteDetails(lookup: any): Subscription {
    this.blockUIList.start();
    return this.apiSvc.delete(`Lookup/detail/${lookup.value}/true`).subscribe(
      response => {
        this.sweetAlert.showSuccess(
          "Success",
          `"${lookup.value}" Deleted Successfully`
        );

        _.remove(this.detailsLookUps, lc => lc.value === lookup.value);

        this.onDetailsLookUpsChanged.next(this.detailsLookUps);
        this.blockUIList.stop();
      },
      error => {
        const errMsg = error.message
          ? error.message
          : error.status
            ? `${error.status} - ${error.statusText}`
            : "Server error";

        this.sweetAlert.showError("Error", errMsg);
        this.blockUIList.stop();
        return Observable.throw(errMsg);
      }
    );
  }
  editDetailLookups(lookup: MasterLookup, id: number): Subscription {
    lookup.id = id;
    this.blockUIList.start();
    return this.apiSvc.put(`Lookup/detail`, lookup).subscribe(
      response => {
        //  _.remove(this.lookUps, lc => lc.id === id);
        let itemIndex = this.detailsLookUps.findIndex(
          item => item.value == response.value
        );
        this.detailsLookUps[itemIndex] = response;
        this.onDetailsLookUpsChanged.next(this.detailsLookUps);
        this.blockUIList.stop();
      },
      error => {
        const errMsg = error.message
          ? error.message
          : error.status
            ? `${error.status} - ${error.statusText}`
            : "Server error";

        this.sweetAlert.showError("Error", errMsg);
        this.blockUIList.stop();
        return Observable.throw(errMsg);
      }
    );
  }
}
