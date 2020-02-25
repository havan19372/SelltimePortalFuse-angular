import { Injectable } from "@angular/core";
import { MasterLookup } from "app/master-lookups/master-lookup.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ApiService } from "../../core/services/api.service";
import { SweetAlertService } from "../../core/services/sweet-alert.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class TaskStatusService {

  @BlockUI('tasksTable')
  blockUIList: NgBlockUI;
  detailsLookUps: MasterLookup[];
  onDetailsLookUpsChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private apiSvc: ApiService, private sweetAlert: SweetAlertService) { }

  getDetailsLookups(): Observable<any[]> {
    return this.apiSvc
      .get(`Lookup/detail/TSKSTATS/false`, null, false)
      .map(response => {
        this.blockUIList.stop();
        return response;
      });
  }

  getProjects(): Observable<any[]> {
    return this.apiSvc
      .get(`Project/board`,null,false)
      .map(response => {
        this.blockUIList.stop();
        return response;
      });
  }

  changeTaskStatus(taskId: number,statusId: number): Observable<any[]> {
    return this.apiSvc
      .get(`Task/Status/${taskId}/${statusId}`, null, false)
      .map(response => {
        this.blockUIList.stop();
        return response;
      });
  }
}
