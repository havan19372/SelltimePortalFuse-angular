import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../core/services/api.service';
import { AuthenticationService } from '../../auth/athentication.service';
import { HttpClient } from '@angular/common/http';
//import { ProjectModel } from '../project.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TimesheetModel } from 'app/projects/project-timesheets/timesheet.model';
@Injectable({
  providedIn: 'root'
})
export class TaskTimesheetService {
  onPagingChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onSearchTextChanged: Subject<any> = new Subject();
  onFilterChanged: Subject<any> = new Subject();
  onProjectsChanged: BehaviorSubject<any> = new BehaviorSubject({});
  Projects: any[] = [];
  searchText: string;
  filterBy: string;
  @BlockUI('ProjectsTable') blockUIList: NgBlockUI;

  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthenticationService,
    private http: HttpClient
  ) { }
  getTimeSheetForTable(
    startValue,
    pageSize,
    sort?: string,
    direction?: string,
    searchText?: string
  ): Observable<any[]> {
    this.blockUIList.start();
    //
    let url =
    `TimeSheet?notes=${searchText}&pageSize=${pageSize}&pageNumber=${startValue}&orderBy=${sort ? sort : 'startDate'} ${direction ? direction : 'asc'}`
    console.log("$url",url);
    return this.apiSvc
      .get(
        url,
        null,
        true
      )
      .map(response => {
        this.blockUIList.stop();
        // debugger;
        return response;
      });
  }

  getProjectsForTable(
    startValue,
    pageSize,
    sort?: string,
    direction?: string,
    searchText?: string
  ): Observable<any[]> {
    this.blockUIList.start();
    return this.apiSvc
      .get(
        `TimeSheet/${searchText}?pageSize=${pageSize}&pageNumber=${startValue}&orderBy=${sort ? sort : 'startDate'} ${direction ? direction : 'asc'}`,
        null,
        true
      )
      .map(response => {
        this.blockUIList.stop();
        // debugger;
        return response;
      });
  }
  deleteTaskTimeSheet(TimeSheet:any): Observable<any> {
    return this.apiSvc.delete(`TimeSheet/${TimeSheet.id}/true`);
  }

}
