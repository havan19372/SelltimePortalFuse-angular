import { AuthenticationService } from './../../auth/athentication.service';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskFilterModel } from '../models/taskFilter.model';
import { catchError } from 'rxjs/operators';
import { TimesheetModel } from '../models/timesheet.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetDataService {
  timeSheetList: any;
   onTimeSheetList: BehaviorSubject<any> = new BehaviorSubject([]);
   onLoading: BehaviorSubject<any> = new BehaviorSubject(false);


  constructor(private apiSvc: ApiService, 
    private authService: AuthenticationService) {
    
  }
addTimeTolist(time){
  this.timeSheetList.unshift(time);
  this.onTimeSheetList.next(this.timeSheetList);
}
  getTimeSheets(filter: TaskFilterModel){
     if(!this.authService.isAdmin()){
  filter.userId=this.authService.user.userId;
    }
    if(filter.dateFrom !=null){filter.dateFrom=new Date(filter.dateFrom).toISOString()}
    if(filter.dateTo !=null){filter.dateTo=new Date(filter.dateTo).toISOString()}
    this.startStopLoading(true);
    this.apiSvc.get(`/TimeSheet?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}
    &DateFrom=${filter.dateFrom}&DateTo=${filter.dateTo}
    &ProjectId=${filter.projectId}&taskId=${filter.taskId}&ProjectSubId=${filter.projectSubId}
    &RefNum=${filter.refNum}&UserId=${filter.userId}
    &Name=${filter.name!=null?filter.name:""}&OrderBy=id desc`).subscribe(data => {
      this.timeSheetList = data;
      this.onTimeSheetList.next(this.timeSheetList);
      this.startStopLoading(false);
    });
  }
startStopLoading(start:boolean){
  this.onLoading.next(start);
}
  GetTimesheetById(id){
    return this.apiSvc.get(`/TimeSheet/${id}`);

  }

  createTimeSheet(timeSheet: any): Observable<TimesheetModel> {
    return this.apiSvc
      .post(`/TimeSheet`, timeSheet)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateTimeSheet(timeSheet: any): Observable<TimesheetModel> {
    return this.apiSvc
      .put(`/TimeSheet/${timeSheet.id}`, timeSheet)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  DeleteTimeSheet(id:any){
    return this.apiSvc.delete(`/TimeSheet/${id}/true`)
    .pipe(catchError((error: any) => Observable.throw(error.json())));

  }
  Done(id:any,done:any){
    return this.apiSvc.get(`TimeSheet/done/${id}?done=${done}`)
    .pipe(catchError((error: any) => Observable.throw(error.json())));

  }
  
}
