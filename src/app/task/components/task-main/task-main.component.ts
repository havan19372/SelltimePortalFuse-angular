import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import * as fromTask from '../../+state';
import * as taskActions from '../../+state/actions/Task.actions';
import { fuseAnimations } from '@fuse/animations';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { TaskService } from 'app/task/service/Task.service';
import { TaskFilterModel } from 'app/task/models/taskFilter.model';
import { TaskModel } from 'app/task/models/task.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SingleTaskComponent } from '../single-task/single-task.component';
import { FormGroup, FormControl } from '@angular/forms';
import { TimeSheetDataService } from 'app/task/service/time-sheet-data.service';
import { TimesheetModel } from 'app/projects/project-timesheets/timesheet.model';
import { SingleTimesheetComponent } from '../single-timesheet/single-timesheet.component';
import { AuthenticationService } from 'app/auth/athentication.service';
import { CommentDataService } from '../../service/comment-data.service';
import { CommentModel } from '../../models/comment.model';
import { CommentSingleComponent } from '../comment-single/comment-single.component';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.scss'],
  animations: fuseAnimations

})
export class TaskMainComponent implements OnInit {
  tasks: TaskModel[];
  searchInput: FormControl;

  timesheets: TimesheetModel[];
  comments: CommentModel[];
  filterParams: TaskFilterModel;
  errorMessage$: Observable<string>;
  selectedTask: TaskModel;
  onSelectedTaskChanged: Subscription;
  dialogRef: any;
  isCollapsed = true;
  isFiltered = false;
  isMyTask: boolean = true;
  isLoading: boolean = false;
  isNotDoneTask:boolean=false;
  notDone: boolean;
  viewMode: string ='commentsTab';
    public size = '15px';
    public fontStyle = 'bold';
    public color="red";
  constructor(
    private router: Router,
    private taskServc: TaskService,
    private timeSheetDataServc: TimeSheetDataService, 
    private authSvc: AuthenticationService,
    public dialog: MatDialog,
    private commentSrvc: CommentDataService,
    private fuseConfig: FuseConfigService,
    public snackBar: MatSnackBar) {
      this.searchInput = new FormControl('');
      this.fuseConfig.config.layout.navigationFolded=true;
      this.fuseConfig.setConfig(this.fuseConfig.config);
  }
  ngOnInit() {
    this.itializeTaskFilter();
    this.taskServc.setTaskFilter(this.filterParams);
    this.taskServc.getTasks();
    this.taskServc.onTasksChanged.subscribe(response => {
      this.timeSheetDataServc.startStopLoading(false);
      this.tasks = response;
    });

    this.taskServc.onSelectTask.subscribe(task => {
      this.selectedTask = task;
    
    })

    this.timeSheetDataServc.onTimeSheetList.subscribe(timesheets => {
      this.timesheets = timesheets.filter(f => f.taskId == this.selectedTask.id);
   
    })

    this.commentSrvc.onCommentList.subscribe(comments => {
      this.comments = comments;
    })
    
    this.timeSheetDataServc.onLoading.subscribe(loading=>{
      this.isLoading=loading;
    })
    this.searchInput.valueChanges
    .debounceTime(300)
    .distinctUntilChanged()
    .subscribe(searchText => {
        this.tasks =   this.taskServc.tasks.filter(t=>
         ( t.name !=null&& t.name.indexOf(searchText.trim())>-1)||
         ( t.detail !=null&&  t.detail.indexOf(searchText.trim())>-1)||
          t.id.toString().indexOf(searchText.trim())>-1 ||
           searchText=="");
     });
 
  }
  
  onMyTaskChange() {
    this.setFilterAssig();
    this.loadTasks();
  }
  setFilterAssig() {
    if (this.isMyTask) {
      this.filterParams.userId = this.authSvc.getUserToken().userId;
    } else { this.filterParams.userId = null; }
  }
  itializeTaskFilter() {
    this.filterParams = {
      pageNumber: 1,
      pageSize: 500,
      projectId: null,
      projectSubId: null,
      name: '',
      dateFrom: null,
      dateTo: null,
      refNum: null,
    };
    this.setFilterAssig();
  }
  getTimeSheets(task: TaskModel) {
    this.filterParams.taskId = task.id;
    this.timeSheetDataServc.getTimeSheets(this.filterParams);
    this.taskServc.SelectTask(task);
      this.commentSrvc.getComments(task.id);
  }

  AddEditTask(taskId): void {
    if (taskId != null) {
      this.taskServc.GetTaskById(taskId).subscribe(data => {
        this.openCloseTaskDialoge(taskId, data);
      });
    } else {
      this.openCloseTaskDialoge(taskId, null);
    }
  }

  openCloseTaskDialoge(taskId?: number, task?: TaskModel) {
    this.dialogRef = this.dialog.open(SingleTaskComponent, {
      width: '800px',
      data: {
        action: task == null ? 'new' : 'edit',
        task: task,
        id: taskId
      }
    });



    this.dialogRef.afterClosed().subscribe((taskForm: FormGroup) => {
      if (!taskForm) {
        return;
      }
      if (taskForm.valid) {
        if (task == null) {
          this.taskServc
            .createTask(taskForm.getRawValue())
            .subscribe(response => {
              this.tasks.unshift(response);
              this.snackBar.open(`Task ${response.name} Created Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000, });
            });
        } else {
          var objectTask = taskForm.getRawValue();
          this.taskServc
            .updateTask(objectTask)
            .subscribe(response => {
              let itemIndex = this.tasks.findIndex(item => item.id == objectTask.id);
              this.tasks[itemIndex] = objectTask;
              this.snackBar.open(`Task ${response.name} Updated Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000, });
            });
        }
      }
    });
  }
  EditTimeSheet(timeSheet: TimesheetModel) {
    this.addEditTimesheet(timeSheet.id, timeSheet);
  }
  DeleteTimeSheet(id: number) {
    this.timeSheetDataServc.DeleteTimeSheet(id).subscribe(response=>{
     this.timesheets=this.timesheets.filter(t=>t.id!=id);
      this.snackBar.open( `TimesSheet #${id} Deleted Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000 });
    });
  }
  
  addEditTimesheet(id: number, timeSheet: TimesheetModel) {
    this.openCloseTimeSheet(id, timeSheet)
  }




  

  openCloseTimeSheet(id: number, timeSheet: TimesheetModel) {
    this.dialogRef = this.dialog.open(SingleTimesheetComponent, {
      width: '800px',
      data: {
        action: timeSheet == null ? 'new' : 'edit',
        timeSheet: timeSheet,
        task: this.selectedTask,
        id: id
      }
    });
    this.dialogRef.afterClosed().subscribe((timeSheetModelRespons: any) => {
      if(!timeSheetModelRespons)return;

      var timeSheetForm = timeSheetModelRespons[1];
      if (!timeSheetForm|| !timeSheetForm.valid) {
        return;
      }
        this.timeSheetDataServc.startStopLoading(true);
        if (timeSheet == null) {
          this.timeSheetDataServc
            .createTimeSheet(this.adjustDate(timeSheetForm.getRawValue()))
            .subscribe(response => {
              this.timeSheetDataServc.addTimeTolist(response)
              this.timeSheetDataServc.startStopLoading(false);
              this.snackBar.open( `Task ${response.id} Created Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000 });
            });
        } else {
          var objectTimeSheet =  this.adjustDate(timeSheetForm.getRawValue()) ;
          // console.log() 
          this.timeSheetDataServc
            .updateTimeSheet(objectTimeSheet)
            .subscribe(response => {
              this.timeSheetDataServc.startStopLoading(false);
              this.findIndexToUpdate(this.timesheets,response);
              this.snackBar.open(`Time Record ${response.id} Updated Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000 });
            });
        }
    });
  }
  adjustDate(formObject){
     
    if(formObject.startDate !=null&& formObject.startDate!=""){
      try{
      formObject.startDate = formObject.startDate.format()
      }catch{
         formObject.startDate =formObject.startDate; 
      }
    }

    if(formObject.completeDate !=null && formObject.completeDate!=""){
      try{
        formObject.completeDate = formObject.completeDate.format()

      }catch{ 
        formObject.completeDate = formObject.completeDate;  
      }
    }
    return formObject;
  }

  findIndexToUpdate(items: any[], newItem: any) {
    let itemIndex = items.findIndex(item => item.id == newItem.id);
    items[itemIndex] = newItem;
  }

  isOpenSearch() {
    this.isCollapsed = !this.isCollapsed;
  }

  filterTasks(filterValues) {
    this.isOpenSearch();
    this.isFiltered = true;
    this.filterParams = filterValues;
    this.loadTasks();

  }
  clearTaskFilter() {
    this.itializeTaskFilter();
    this.isFiltered = false;
    this.loadTasks();

  }
  loadTasks() {
    this.timeSheetDataServc.startStopLoading(true);
    this.taskServc.setTaskFilter(this.filterParams);
    this.taskServc.getTasks();
  }
  onNotDoneChange() {
    this.timeSheetDataServc.onTimeSheetList.subscribe(timesheets => {
      this.timesheets = timesheets;

      if(this.notDone==true){
        this.timesheets = timesheets.filter(time=>time.done!=this.notDone);;
      }
    })
  }

  
  EditComment(comment: CommentModel) {
    this.openCloseComment(comment.id, comment);
  }
  openCloseComment(id: number, comment: CommentModel) {
    this.dialogRef = this.dialog.open(CommentSingleComponent, {
      width: '500px',
      data: {
        action: comment == null ? 'new' : 'edit',
        comment: comment,
        task: this.selectedTask,
        id: id
      }
    });
    this.dialogRef.afterClosed().subscribe((commentModelRespons: any) => {
      if(!commentModelRespons)return;
      var commentForm = commentModelRespons[1];
      if (!commentForm|| !commentForm.valid) {
        return;
      }
        this.timeSheetDataServc.startStopLoading(true);
        if (comment == null) {
          this.commentSrvc
            .createComment(commentForm.getRawValue())
            .subscribe(response => {
              this.comments.push(response);
              this.timeSheetDataServc.startStopLoading(false);
              this.snackBar.open( `Comment ${response.id} Created Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000 });
            });
        } else {
          var objectTimeSheet = commentForm.getRawValue();
          this.commentSrvc
            .updateComment(objectTimeSheet)
            .subscribe(response => {
              this.timeSheetDataServc.startStopLoading(false);
              this.findIndexToUpdate(this.comments,response);
              this.snackBar.open(`Comment ${response.id} Updated Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000 });
            });
        }
    });
  }

  deleteComment(id: number) {
    this.commentSrvc.DeleteComment(id).subscribe(response=>{
     this.comments=this.comments.filter(t=>t.id!=id);
      this.snackBar.open( `Delete #${id} Deleted Successfuly`, 'OK', { verticalPosition: 'top', duration: 1000 });
    });
  }
}
