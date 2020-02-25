import { Injectable } from '@angular/core';
import { TimesheetModel } from './timesheet.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiService } from '../../core/services/api.service';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../auth/athentication.service';
import { ProjectModel } from '../project.model';
import { Subscription } from 'rxjs/Subscription';
import { ProjectService } from '../project.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as _ from 'lodash';
import { TaskModel } from '../project-tasks/tasks.model';
import { TasksService } from '../project-tasks/tasks.service';
import { SingleTaskModel } from '../project-tasks/single-task/single-task-mode';

@Injectable()
export class TimesheetService {
  timesheets: TimesheetModel[];
  currentTimesheet: TimesheetModel;
  searchText: string;

  @BlockUI('projectTimesheetListBlock') blockUIList: NgBlockUI;

  onTimesheetsChanged: BehaviorSubject<TimesheetModel[]> = new BehaviorSubject(
    []
  );
  onCurrentTimesheetChanged: BehaviorSubject<any> = new BehaviorSubject([]);

  onSearchTextChanged: BehaviorSubject<any> = new BehaviorSubject('');
  onNewTimesheetClicked: Subject<any> = new Subject();
  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthenticationService,
    private snackBar: MatSnackBar,
    private projectSvc: ProjectService,
    private taskSvc:TasksService
  ) {}

  getTimesheetsByProjectId(project: ProjectModel): Subscription {
    this.blockUIList.start();
    this.projectSvc.onSelectedProjectChanged.next(project);
    this.currentTimesheet = new TimesheetModel();
    this.onCurrentTimesheetChanged.next([this.currentTimesheet, null]);
    return this.apiSvc
      .get(`TimeSheet?PageNumber=1&PageSize=50&ProjectId=${project.id}`)
      .subscribe(response => {
        console.log("#eventResponse",response);
        this.timesheets = response;
        this.onTimesheetsChanged.next(this.timesheets);
        this.blockUIList.stop();
      }, this.handleError);
  }

  getTimesheetsByTaskId(task:TaskModel):Subscription {
    this.blockUIList.start();
    this.taskSvc.onSelectedTaskChanged.next(task);
    this.currentTimesheet = new TimesheetModel();
    this.onCurrentTimesheetChanged.next([this.currentTimesheet, null]);
    const url=`TimeSheet?TaskId=${task.id}&PageNumber=1&PageSize=100`;
    // debugger
    console.log("@url",url);
    return this.apiSvc
      .get(url)
      .subscribe(response => {
        console.log("#event",response);
        // debugger
        this.timesheets = response;
        this.onTimesheetsChanged.next(this.timesheets);
        this.blockUIList.stop();
      }, this.handleError);
  }

  getTimeSheetById(timesheetId: number): Subscription {
    this.blockUIList.start();
    return this.apiSvc.get(`TimeSheet/${timesheetId}`).subscribe(response => {
      // debugger;
      response.id = timesheetId;
      this.currentTimesheet = response;
      this.onCurrentTimesheetChanged.next([this.currentTimesheet, 'edit']);
      this.blockUIList.stop();
    }, this.handleError);
  }

  
  createTimesheet(timesheet: TimesheetModel): Observable<TimesheetModel> {
    this.blockUIList.start();
    return this.apiSvc
      .post(`TimeSheet`, timesheet)
      .map(response => {
        // debugger;
        if (response) {
          response.creator = this.authSvc.getUserToken().fullName;
          this.timesheets  = this.timesheets ? this.timesheets : [];
          this.timesheets.push(response);
          this.onTimesheetsChanged.next(this.timesheets);
          this.blockUIList.stop();
          return response;
        }
      })
      .catch(this.handleError);
  }


  editTimesheet(timesheet: TimesheetModel): Observable<TimesheetModel> {
    this.blockUIList.start();
    const id = timesheet.id;
    delete timesheet.id;
    return this.apiSvc
      .put(`TimeSheet/${id}`, timesheet)
      .map(response => {
        // debugger;
        if (response) {
          _.remove(this.timesheets, pm => pm.id === id);
          this.timesheets.push(response);
          this.onTimesheetsChanged.next(this.timesheets);
          this.currentTimesheet = new TimesheetModel(response);
          this.onCurrentTimesheetChanged.next(this.currentTimesheet);
          this.blockUIList.stop();
          return response;
        }
      })
      .catch(this.handleError);
  }
  

  private handleError(error) {
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';

    return Observable.throw(errMsg);
    // this.snackBar.open(errMsg, 'OK', {
    //   verticalPosition: 'top',
    //   duration: 1000,
    //   panelClass: 'mat-red-bg'
    // });
  }
  deleteTimeSheet(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiSvc
        .delete(
          `TimeSheet/${id}/true`
        )
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
