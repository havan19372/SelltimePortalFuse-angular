import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';

import {
  FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA,MatSnackBar } from '@angular/material';
 

import * as _ from 'lodash';
import { TaskModel } from 'app/task/models/task.model';
import { LookUpModel } from 'app/core/lookUpCodes';
import { TaskLookupService } from 'app/task/service/task-lookup.service';
import { UserService } from 'app/users-new/user/user.service';
import { AuthenticationService } from 'app/auth/athentication.service';
 @Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit {
  dialogTitle: string;
  taskForm: FormGroup;
  action: string;
  task:TaskModel;
   projectList: LookUpModel[] = [];
   filteredSubProject:any[]=[];
   userList:any[]=[];
   taskStatus:any[]=[];
  constructor(
    public dialogRef: MatDialogRef<SingleTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private userServc: AuthenticationService,
    public snackBar: MatSnackBar,
    private taskLookupServie:TaskLookupService
  ) {
       
  }
  createTaskForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.task.id],
      name: [this.task.name, Validators.required],
      detail: [this.task.detail],
      projectId: [this.task.projectId],
      projectSubId: [this.task.projectSubId],
      statusId: [this.task.statusId],
      refNum:[this.task.refNum],
      // status:[this.task.status],
      startDate:[this.task.startDate],
      completeDate:[this.task.completeDate],
      estimateHour:[this.task.estimateHour],
      assignId:[this.task.assignId]
    });
  }
  ngOnInit() {
    this.action = this.data.action;
    if (this.action === 'edit') {
      this.task = this.data.task;
      this.task.id = this.data.id;
      this.dialogTitle = `Edit Task #${this.task.id}`;
    } 
    else 
    {
      this.task={
        id:null,
        name:'',
        startDate: new Date().toISOString(),
        assignId:this.userServc.getUserToken().userId
      }
      this.dialogTitle = 'New Task';
    }
    this.initializeLookup();
    this.taskForm = this.createTaskForm();
  }
  initializeLookup(){
    this.taskLookupServie.onprojectList.subscribe(data=>this.projectList=data);
    this.taskLookupServie.onSubprojectList.subscribe(data=>this.filteredSubProject=data);
    this.taskLookupServie.onUsers.subscribe(data=>this.userList=data);
    this.taskLookupServie.onTaskStatusList.subscribe(data=>this.taskStatus=data);
  }

}
