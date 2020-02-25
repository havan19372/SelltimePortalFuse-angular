import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Paging } from '../models/paging.model';
import { ApiService } from 'app/core/services/api.service';
import { environment } from 'environments/environment.hmr';
import { TaskModel } from '../models/task.model';
import { TaskFilterModel } from '../models/taskFilter.model';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: TaskModel[];
  onTasksChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  selectedTask:TaskModel;
  onSelectTask: BehaviorSubject<any> = new BehaviorSubject({});
  taskFilter: TaskFilterModel;
  onTaskFilter: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private apiSvc: ApiService) {}
 
 
  getTasks(): Subscription {
    if(this.taskFilter.dateFrom !=null){this.taskFilter.dateFrom=new Date(this.taskFilter.dateFrom).toISOString()}
    if(this.taskFilter.dateTo !=null){this.taskFilter.dateTo=new Date(this.taskFilter.dateTo).toISOString()}
    return this.apiSvc
      .get(
        `task?PageNumber=${this.taskFilter.pageNumber}&PageSize=${this.taskFilter.pageSize}&DateFrom=${this.taskFilter.dateFrom}&DateTo=${this.taskFilter.dateTo}
        &ProjectId=${this.taskFilter.projectId}&ProjectSubId=${this.taskFilter.projectSubId}
        &statusId=${this.taskFilter.statusId}& &RefNum=${this.taskFilter.refNum}&UserId=${this.taskFilter.userId}
        &Name=${this.taskFilter.name}&OrderBy=id desc&NotDone=${this.taskFilter.NotDone!==true?null:true}`,
        {
          withCredentials: true,
          observe: 'response'
        }
      ).subscribe
        (response => {
          this.tasks = response;
          this.onTasksChanged.next(this.tasks);
        },   catchError((error: any) => Observable.throw(error.json())));
     
  }

  setTaskFilter(params: TaskFilterModel){
   this.taskFilter=params;
   this.onTaskFilter.next(this.taskFilter); 
   }


  createTask(task: any): Observable<TaskModel> {
    return this.apiSvc
      .post(`/task`, task)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateTask(task: any): Observable<TaskModel> {
    return this.apiSvc
      .put(`/task/${task.id}`, task)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }


  SelectTask(task:TaskModel){
    this.selectedTask = task;
    this.onSelectTask.next(this.selectedTask);
  }
 GetTaskById(id:number){
   return this.apiSvc.get(`/task/${id}`);
 }
}
