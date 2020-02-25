import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  QueryList
} from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatExpansionPanel,
  MatSnackBar
} from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { fuseAnimations } from '@fuse/animations';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { SingleTaskComponent } from '../single-task/single-task.component';
import { LookUpModel } from '../../../core/lookUpCodes';
import { ProjectModel } from '../../project.model';
import { SweetAlertService } from '../../../core/services/sweet-alert.service';
import { TaskModel } from '../tasks.model';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { TimesheetModel } from '../../project-timesheets/timesheet.model';
import { TimesheetService } from 'app/projects/project-timesheets/timesheet.service';
@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  animations: fuseAnimations
})
export class TasksListComponent implements OnInit, AfterViewInit {
  dialogRef: any;
  projectList$: LookUpModel[] = [];
  displayedColumns = [
    'refNum',
    'name',
    // 'project',
    'estimateHour',
    'startDate',
    'completeDate',

    'creator',
    // 'counts',
    'options'
  ];
  tasksList: TaskModel[];
  onTasksChanged: Subscription;
  paginator: any;
  tasksLength: number;
  
  constructor(
    private tasksSvc: TasksService,
    private timesheetSvc: TimesheetService,
    private sweetAlert: SweetAlertService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.tasksSvc.onprojectList.subscribe(projects => {
      this.projectList$ = projects.length ? projects : [];
    });
  }

  openCardDialog(cardId) {
    this.dialogRef = this.dialog.open(SingleTaskComponent, {
      panelClass: 'scrumboard-card-dialog',
      data: {
        cardId: cardId
        //listId: this.list.id
      }
    });
    this.dialogRef.afterClosed().subscribe(response => {});
  }

  deleteTask(task: TaskModel): void {
    this.sweetAlert.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.tasksSvc.deleteTask(task).subscribe(response => {
            debugger;
            this.snackBar.open(`task ${task.name}  saved `, 'deleted', {
              verticalPosition: 'top',
              duration: 2000
            });
            this.tasksList = this.tasksList.filter(elem => elem != task);
          });
        }
      }
    );
  }

  onSaveTask($event): void {
    debugger;
    // this.tasksList.push($event);
    this.tasksSvc.saveTask($event).subscribe((data: TaskModel) => {
      debugger;
      this.tasksList.push(data);
    });
  }

  onApplyFilter() {}

  onResetFilter() {}

  onGetTasksByName($event: string): void {
    this.onTasksChanged = this.tasksSvc
      .getTasks(1, 50, '', '', $event)
      .subscribe(tasks => {
        this.tasksList = tasks;
      });
  }

  saveTimesheet($event: TimesheetModel): void {
    this.timesheetSvc.createTimesheet($event).subscribe(data => {
      debugger;

    });
  }

  ngOnInit() {
    this.onTasksChanged = this.tasksSvc
      .getTasks(
        1,
        50,
        null,
        null,
        null,
        moment().subtract(7,'d').format('MM/DD/YY, HH:mm A')
      )
      .subscribe(tasks => {
        debugger;
        this.tasksList = tasks;
      });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.onTasksChanged.unsubscribe();
  }
}
