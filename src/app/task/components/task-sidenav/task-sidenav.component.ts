import { TaskModel } from './../../../projects/project-tasks/tasks.model';
import * as _ from 'lodash';
import {  Component,  OnInit, OnDestroy,  Input,  Output,  EventEmitter} from '@angular/core';
 
import { Subscription } from 'rxjs/Subscription';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { SingleTaskComponent } from '../single-task/single-task.component';
import { TaskService } from 'app/task/service/Task.service';




@Component({
  selector: 'app-task-sidenav',
  templateUrl: './task-sidenav.component.html',
  styleUrls: ['./task-sidenav.component.scss'],
  animations: fuseAnimations
})
export class TaskSidenavComponent implements OnInit, OnDestroy {
  @Input() headerBg: string;
  @Output()
  onSelection: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();
  @Output() onAddEditTask: EventEmitter<any> = new EventEmitter<any>();
  @Input() tasks: TaskModel[];
  @Input() selectedTask: TaskModel;
  dialogRef: MatDialogRef<SingleTaskComponent, any>;
  onTasksChanged: Subscription;
  accounts: any;
  selectedAccount: string;
  constructor(
    private projectSvc: TaskService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }
 
  ngOnInit() {
    // this.onTasksChanged = this.projectSvc.onTasksChanged.subscribe(
    //   response => {
    //     this.tasks = response;
    //   }
    // );
  }

  newTask(): void {
    this.onAddEditTask.emit(null);
  }
  
  selectTask(task: TaskModel) {
    // this.selectedTask = task;
    this.onSelection.emit(task);
  }

  ngOnDestroy() {
  }
}
