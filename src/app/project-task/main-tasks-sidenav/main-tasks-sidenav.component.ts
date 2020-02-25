import * as _ from 'lodash';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModel } from 'app/projects/project.model';
import { ProjectCreateComponent } from 'app/projects/project-create/project-create.component';
import { ProjectService } from 'app/projects/project.service';
import { SingleTaskComponent } from '../single-task/single-task.component';
import { TaskModel } from 'app/projects/project-tasks/tasks.model';
import { TasksService } from 'app/projects/project-tasks/tasks.service';
import * as moment from 'moment';
import { SingleTaskModel } from '../single-task-model';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs/Observable';
import { SweetAlertService } from 'app/core/services/sweet-alert.service';
import { ApiService } from 'app/core/services/api.service';

@Component({
  selector: 'app-main-tasks-sidenav',
  templateUrl: './main-tasks-sidenav.component.html',
  styleUrls: ['./main-tasks-sidenav.component.scss'],
  animations: fuseAnimations
})
export class MainTasksSidenavComponent implements OnInit{
  @Input() headerBg: string;
  @Input() filter: any;
  searchResult:boolean=true;
  loader = true;
  taskLength=false;
  @Output()
  onTaskSelection: EventEmitter<any> = new EventEmitter<any>();
  onTaskChanged=Subscription;
  pageType: string = '';
  selectedTask:any;
  statusResult:any;
  tasksList: TaskModel[];
  tasksListCopy:TaskModel[];
  onTasksChanged: Subscription;
   dialogRef: MatDialogRef<SingleTaskComponent, any>;
   accounts: any;
   selectedAccount: string;
   task = new SingleTaskModel();
   blockUIList: NgBlockUI;
   constructor(
    private projectSvc: ProjectService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private ds: ApiService,
    private taskSrv: TasksService,
    private sweetAlert:SweetAlertService
  ) {
    this.accounts = {
      creapond: 'Admin@SellTimePortal.com',
      withinpixels: 'TEST@SellTimePortal.com'
    };

    this.selectedAccount = 'creapond';
  }

  ngOnInit() {
    this.onTasksChanged = this.taskSrv
      .getTasks(
        1,
        50,
        null,
        null,
        null,
        moment().subtract(7,'d').format('MM/DD/YY, HH:mm A')
      )
      .subscribe(tasks => {
        // debugger;
        this.tasksList = tasks;
        this.tasksListCopy=tasks;
      });
  }
  
  //used to create-task
  newTask(): void {
    this.dialogRef = this.dialog.open(SingleTaskComponent, {
      panelClass: 'mail-compose-dialog',
      width: '600px',
      data: {
        action: 'add'
      }
    });
    this.dialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }
      this.taskSrv.taskStatus.subscribe(status=>{
        this.statusResult=status;
      });
      var formValues=response[1].getRawValue();
      this.task.name = formValues.name;
      this.task.completeDate = formValues.completeDate;
      this.task.detail = formValues.detail;
      this.task.assignId=formValues.assignId;
      this.task.estimateHour = formValues.estimateHour;
      this.task.startDate = formValues.startDate;
      this.task.projectId = formValues.projectId;
      this.task.refNum = formValues.refNum;
      this.task.projectSubId = formValues.projectSubId;
      this.task.attachments = [];
      this.task.statuses=this.statusResult;
      this.task.comments = [];
      if (response[0] === 'add') 
      {
       this.taskSrv
       .createTask(
        this.task
      )
      .subscribe(
        res => {
         this.taskSrv.onTaskChanged.next(res);
          this.tasksList.push(res);
          this.snackBar.open(`task saved `, 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        },
        error => {
        }
      );
      }
    });
  }

  selectTask(task:any){
    this.selectedTask=task;
    this.taskSrv.taskState=this.selectedTask;
    this.onTaskSelection.emit(this.selectedTask); 
  }
  
  pushNewTask(task?: any): void {
    const found = this.tasksList.find((p: any) => p.id === task.id);
    if (found) {
      _.remove(this.tasksList, (pm: any) => pm.id === task.id);
      this.tasksList.unshift(task);
    }
    else {
      this.tasksList.unshift(task);
    }
  }

  UpdateTask(task?:any) {
    debugger;
    this.dialogRef = this.dialog.open(SingleTaskComponent, {
      panelClass: 'mail-compose-dialog',
      width: '600px',
      data: {
        action: 'edit',
        task:task
      }
    });
    this.dialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }
      this.taskSrv.taskStatus.subscribe(status=>{
        this.statusResult=status;
      });
      var UpdateformValues=response[1].getRawValue();
      this.task.name = UpdateformValues.name;
      this.task.id =UpdateformValues.id;
      this.task.completeDate = UpdateformValues.completeDate;
      this.task.detail = UpdateformValues.detail;
      this.task.estimateHour = UpdateformValues.estimateHour;
      this.task.startDate = UpdateformValues.startDate;
      this.task.projectId = UpdateformValues.projectId;
      this.task.refNum = UpdateformValues.refNum;
      this.task.projectSubId = UpdateformValues.projectSubId;
      this.task.assignId=UpdateformValues.assignId;
      this.task.attachments = [];
      this.task.statuses = this.statusResult;
      this.task.comments = [];
      if (response[0] === 'edit') {
        this.taskSrv.editTask(this.task).subscribe(
          elem => {
            // debugger;
            this.taskSrv.onTaskChanged.next(elem);
             this.pushNewTask(elem);
            this.snackBar.open('Task Edited', 'OK', {
              verticalPosition: 'bottom',
              duration: 1000,
              panelClass: 'mat-green-bg'
            });
          }
        );
      }
    });
  }
  
  deleteTask(task:any): void {
    this.sweetAlert.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.taskSrv.deleteTask(task).subscribe(response => {
            this.sweetAlert.showSuccess(
              'Deleted Successfully',
              `TimeSheet ${task.name} deleted !`
            );
            this.tasksList = this.tasksList.filter(item => item.id != task.id);
          });
        }
      }
    );
  }

  getUserTask(value:boolean)
  {
    if(value===true){
      let id=1;
      this.taskSrv.getTaskByUserId(id).subscribe(res=>{
      this.tasksList=res;
    });
    }
  }

  showAllTasks(){
   this.tasksList=this.tasksListCopy;
   this.loader=true;
  }
  getTaskById(pageNumber: any, pageSize: any,search:any) {
    // debugger;
    if(search=="")
    {
      this.tasksList=this.tasksListCopy;
      this.loader=true;
    }
    else 
    {
      const url = `${search}?pageSize=${pageSize}&pageNumber=${pageNumber}`;
      this.taskSrv.getSingleTask(url).subscribe(response => {
      this.loader = false;
      this.tasksList=response;
      if(response==null)
      {
        this.taskLength=true;
      }
    });
    }
  }  
  ngOnDestroy() {
    this.onTasksChanged.unsubscribe();
  }
  }
