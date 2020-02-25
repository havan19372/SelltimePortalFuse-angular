import { AuthenticationService } from 'app/auth/athentication.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TaskFilterModel } from 'app/task/models/taskFilter.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaskLookupService } from 'app/task/service/task-lookup.service';
import { TaskService } from 'app/task/service/Task.service';
import { LookUpModel } from 'app/core/lookUpCodes';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {
  @Output() onTaskFilter: EventEmitter<TaskFilterModel> = new EventEmitter<TaskFilterModel>();
  currentTaskFilter:TaskFilterModel;
  taskFilterForm: FormGroup;

  projectList: LookUpModel[] = [];
  statuses: LookUpModel[] = [];
  filteredSubProject:any[]=[];
  userList:any[]=[];

  constructor(   private formBuilder: FormBuilder,
    private taskServc: TaskService,
    private taskLookupServie:TaskLookupService,
    public authService:AuthenticationService) { }

  ngOnInit() {
    this.taskServc.onTaskFilter.subscribe(filter=>{
      this.currentTaskFilter=filter;
    });
    this.initializeLookup();
    this.taskFilterForm = this.createTaskForm();
  }

  initializeLookup(){
    this.taskLookupServie.onprojectList.subscribe(data=>this.projectList=data);
    this.taskLookupServie.onSubprojectList.subscribe(data=>this.filteredSubProject=data);
    this.taskLookupServie.onUsers.subscribe(data=>this.userList=data);
    this.taskLookupServie.onTaskStatusList.subscribe(data=>this.statuses=data);
  }

  filterTask() {
    this.taskServc.setTaskFilter(this.taskFilterForm.getRawValue());
    this.onTaskFilter.emit(this.taskFilterForm.getRawValue());
  }

  createTaskForm(): FormGroup {
    return this.formBuilder.group({
      name: [this.currentTaskFilter.name],
      projectId: [this.currentTaskFilter.projectId],
      projectSubId: [this.currentTaskFilter.projectSubId],
      refNum:[this.currentTaskFilter.refNum],
      dateFrom:[this.currentTaskFilter.dateFrom],
      dateTo:[this.currentTaskFilter.dateTo],
      userId:[this.currentTaskFilter.userId],
      pageNumber:[this.currentTaskFilter.pageNumber],
      pageSize:[this.currentTaskFilter.pageSize],
      statusId:[this.currentTaskFilter.statusId]
    });
  }
}
