import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { LookUpCodes } from 'app/core/lookUpCodes';

@Injectable({
  providedIn: 'root'
})
export class TaskLookupService {
  projectList: any;
  onprojectList: BehaviorSubject<any> = new BehaviorSubject([]);
  subProjectList: any;
  onSubprojectList: BehaviorSubject<any> = new BehaviorSubject([]);
  TaskStatus: any;
  onTaskStatusList: BehaviorSubject<any> = new BehaviorSubject([]);
  Users: any;
  onUsers: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private apiSvc: ApiService) {
    this.loodTaskLooukup();
  }
  loodTaskLooukup() {
    this.apiSvc.get(`/Project/selectList`).subscribe(data => {
      this.projectList = data;
      this.onprojectList.next(this.projectList);
    });

    this.apiSvc.get(`/ProjectSub/selectList`).subscribe(data => {
      this.subProjectList = data;
      this.onSubprojectList.next(this.subProjectList);
    });


    this.apiSvc.get(`Lookup/detail/${LookUpCodes.TaskStatuses}/false`).subscribe(data => {
      this.TaskStatus = data;
      this.onTaskStatusList.next(this.TaskStatus);
    });

    this.apiSvc.get('User?PageNumber=1&PageSize=100').subscribe(data => {
      this.Users = data;
      this.onUsers.next(this.Users);
    })
  }

}
