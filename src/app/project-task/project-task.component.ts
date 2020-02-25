import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { fuseAnimations } from '@fuse/animations';
import { TimesheetModel } from 'app/projects/project-timesheets/timesheet.model';
import { ProjectModel } from 'app/projects/project.model';
import { TimesheetService } from 'app/projects/project-timesheets/timesheet.service';
import { ProjectService } from 'app/projects/project.service';
import { TaskModel } from 'app/projects/project-tasks/tasks.model';
import { TasksService } from 'app/projects/project-tasks/tasks.service';
import { MainTasksSidenavComponent } from './main-tasks-sidenav/main-tasks-sidenav.component';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss'],
  animations: fuseAnimations
})
export class ProjectTaskComponent implements OnInit{
  searchInput:FormControl;
  @ViewChild(MainTasksSidenavComponent) sideTaskComponent;
  currentTimesheet: TimesheetModel;
  onSelectedTaskChanged:Subscription;
  onTimesheetsChanged: Subscription;
  onCurrentTimesheetChanged: Subscription;
  selectedTask:TaskModel;
  isCollapsed = true;
  searchChangeObserver:any;
  myValue:any;
  constructor(
    private taskService:TasksService,
    private timeSheetService:TimesheetService
  ){
      this.searchInput = new FormControl('');
  }

  ngOnInit(){
    this.taskService.getTask();
    this.onCurrentTimesheetChanged = this.timeSheetService.onCurrentTimesheetChanged.subscribe(
      ([currentTimesheet, formType]) => {
        if (!currentTimesheet) {
          this.currentTimesheet = null;
        } else {
          this.currentTimesheet = currentTimesheet;
        }
      }
    );
    this.onSelectedTaskChanged=this.taskService.onSelectedTaskChanged.subscribe(tasks=>{
      this.selectedTask=tasks;
    });
  }
  getTaskTimesheets(task:any){
    debugger;
    this.timeSheetService.getTimesheetsByTaskId(task);
  }

  isOpenSearch() {

    if(this.isCollapsed)
    {
      this.isCollapsed = false;
    }
    else
    {
      this.isCollapsed = true;
    }
    console.log('test', this.isCollapsed);
  }
  
  showAddTimesheet(): void {
    this.timeSheetService.onNewTimesheetClicked.next('');
  }

  deSelectCurrentTimesheet() {
    this.timeSheetService.onCurrentTimesheetChanged.next([null, null]);
  }
  dataChanged(event) {
    if (event.length) {
      const searchData = event;
      this.sideTaskComponent.getTaskById(1, 50, searchData);
    } else {
      this.sideTaskComponent.getTaskById(1, 50, '');
    }
  }
  searchKeyUp(event) {
    let term: string = event.target.value;
    // debugger;
    this.sideTaskComponent.getTaskById(1,50,term);
  }

  changeEvent(event){
    if (event.checked ===true) {
      this.sideTaskComponent.getUserTask(event.checked); 
    }
    if (event.checked===false) {
      this.sideTaskComponent.showAllTasks();
    } 
  } 
  ngOnDestroy(): void {
    //this.onTimesheetsChanged.unsubscribe();
    //this.onCurrentTimesheetChanged.unsubscribe();
  }
}
