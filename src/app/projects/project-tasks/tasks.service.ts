import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/services/api.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of, BehaviorSubject, throwError, Subscription } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SingleTaskModel } from './single-task/single-task-mode';
import { environment } from 'environments/environment';
import { DatePipe } from '@angular/common';
import { TaskModel } from './tasks.model';
import * as moment from 'moment';
//import _ = require('lodash');
import * as _ from 'lodash';

@Injectable()
export class TasksService {
  private ApiUrl = environment.DevApiUrl;
  @BlockUI('tasksTable')
  blockUIList: NgBlockUI;
  task: any;
  selectedTask:SingleTaskModel;
  private statuses:any[]=[];
  onTaskChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onSelectedTaskChanged: BehaviorSubject<any> = new BehaviorSubject({});
  projectList: any;
  onprojectList: BehaviorSubject<any> = new BehaviorSubject({});
  subProjectList: any;
  onsubProjectList: BehaviorSubject<any> = new BehaviorSubject({});
  
  constructor(private apiSvc: ApiService) {
    //Project/selectList
    this.apiSvc.get(`Project`).subscribe(data => {
      this.projectList = data;
      this.onprojectList.next(this.projectList);
    });
    //ProjectSub
    this.apiSvc.get(`ProjectSub`).subscribe(subProj=>{
      this.subProjectList=subProj;
      this.onsubProjectList.next(this.subProjectList);
    });
  }
  //added
  private taskStateSubject = new BehaviorSubject({});
  private taskStatusSubject = new BehaviorSubject(this.statuses);

  get taskState(): any {
    return this.taskStateSubject.asObservable();
  }
  set taskState(obj:any) 
  {
  
   this.taskStateSubject.next(obj);
  }

  get taskStatus(): any {
    return this.taskStatusSubject.asObservable();
  }
  set taskStatus(obj:any) 
  {
   this.clearState();
   this.statuses.push(obj);
   this.taskStatusSubject.next([...this.taskStatusSubject.getValue(),...obj]);
  }
  
  getTask(): Subscription {
    this.blockUIList.start();
    return this.apiSvc
      .get(`Task?PageNumber=1&PageSize=50`)
      .subscribe(response => {
        this.task = response;
        this.onTaskChanged.next(this.task);
        this.blockUIList.stop();
      }, this.handleError);
  }
  getTasks(
    startValue,
    pageSize,
    sort?: string,
    direction?: string,
    searchText?: string,
    startDate?: string,
    completeDate?: string,
    projectId?: string
  ): Observable<any[]> {
    return this.apiSvc
      .get(
        `Task?pageSize=${pageSize}&pageNumber=${startValue}
        &DateFrom=${startDate}&DateTo=${completeDate ? completeDate: '' }&ProjectId=${
          projectId ? projectId : ''
        }&SearchQuery=${searchText ? searchText : ''}
        &orderBy=${sort ? sort : 'startDate'} ${direction ? direction : 'asc'}`,
        null,
        true
      )
      .map(response => {
        this.blockUIList.stop();
        return response.body;
      });
  }

  uptadeTask(task) {
    this.task = task;
    this.onTaskChanged.next(this.task);
  }
  editTask(task:any): Observable<any> {
    const taskId = task.id;
    //delete task.id;
    console.log("$taskID",taskId,task);
    this.blockUIList.start();
    return this.apiSvc
      .put(`Task/${taskId}`,task)
      .map(response => {
        this.blockUIList.stop();
        return response;
      })
      .catch(error => {
        const errMsg = error.message
          ? error.message
          : error.status
            ? `${error.status} - ${error.statusText}`
            : 'Server error';
        return Observable.throw(errMsg);
      });
  }

  getSingleTask(id:any){
    return this.apiSvc.get(`Task/${id}`);
  }
  getTaskByUserId(UserId:any)
  {
    let url = `Task?UserId=${UserId}&PageNumber=1&PageSize=50`;
    return this.apiSvc.get(url);
  }
  getSubProject(id:any){
    return this.apiSvc.get(`ProjectSub/${id}`);
  }
  getAllSubProject(){
    return this.apiSvc.get(`ProjectSub`);
  }
  getSelectedProject(id:any){
    return this.apiSvc.get(`Project/${id}`);
  }
  getSubProjectByProjectId(id:any){
    let url = `projectSub?projectId=${id}`;
    console.log("@urlSubProject",url);
    return this.apiSvc.get(url);
  }
  
  mainpluateServerTask(
    id: number,
    task: SingleTaskModel
  ): Observable<SingleTaskModel> {
    console.log("@whats",task);
    var request = this.apiSvc.post('Task', task);
    if (id != null) {
      var request = this.apiSvc.put(`Task/${id}`, task);
    }
    this.uptadeTask(task);
    return request;
  }

  saveTask(task:TaskModel): Observable<TaskModel> {
    this.blockUIList.start();
    return this.apiSvc
      .post(`Task`, task)
      .map(response => {
        this.blockUIList.stop();
        this.uptadeTask(task);
        return response;
      })
      .catch(this.handleError);
  }
  
  createTask(task:SingleTaskModel):Observable<SingleTaskModel> {
    this.blockUIList.start();
    return this.apiSvc
      .post(`Task`,task)
      .map(response => {
        this.blockUIList.stop();
        this.onTaskChanged.next(response);
        return response;
      })
      .catch(this.handleError);
  }

  deleteTask(Task:any): Observable<any> {
    this.blockUIList.start();
    return this.apiSvc.delete(`Task/${Task.id}/true`).map(response => {
      debugger;
      _.remove(this.task,(e:any)=> e.id === Task.id);
      this.onTaskChanged.next(this.task);
      //this.selectedTask= new SingleTaskModel();
      //this.onSelectedTaskChanged.next(this.selectedTask);
      this.blockUIList.stop();
      return response;
    });
  }
  
  clearState()
  {
    this.statuses=[];
    this.taskStatusSubject.next([]);
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
