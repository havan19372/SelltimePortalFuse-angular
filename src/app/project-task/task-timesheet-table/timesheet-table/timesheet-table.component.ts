import * as _ from 'lodash';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialogRef,
  MatDialog,
  MatSnackBar
} from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { ProjectModel } from 'app/projects/project.model';
import { ProjectCreateComponent } from 'app/projects/project-create/project-create.component';
import { ProjectProjectsService } from 'app/projects/project-projects/project-projects.service';
import { SweetAlertService } from 'app/core/services/sweet-alert.service';
import { TaskTimesheetService } from '../task-timesheet.service';
@Component({
  selector: 'app-timesheet-table',
  templateUrl: './timesheet-table.component.html',
  styleUrls: ['./timesheet-table.component.scss'],
  animations: fuseAnimations
})
export class TimesheetTableComponent implements OnInit {

  @Input() filter: any;
  callNewProject: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>();

  displayedColumns = ['name', 'startDate', 'completeDate', 'options'];
  dataSource = new MatTableDataSource();
  imageUrl: string;
  ProjectsLength: number;
  isLoadingResults: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  projectAddDialogRef: MatDialogRef<ProjectCreateComponent, any>;
  constructor(
    private router: Router,
    private ProjectsService: ProjectProjectsService,
    private timeSheetService:TaskTimesheetService,
    private sweetAlert: SweetAlertService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.imageUrl = environment.ImageApiUrl;
  }

  newProject(project?: ProjectModel) {
    // debugger;
    this.projectAddDialogRef = this.dialog.open(ProjectCreateComponent, {
      panelClass: 'mail-compose-dialog',
      width: '600px',
      data: {
        action: 'edit',
        project: project
      }
    });

    this.projectAddDialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }

      if (response[0] === 'edit') {
        this.ProjectsService.editProject(response[1].getRawValue()).subscribe(
          elem => {
            // debugger;
            this.pushNewProject(elem);
            this.snackBar.open('Project Edited', 'OK', {
              verticalPosition: 'bottom',
              duration: 1000,
              panelClass: 'mat-green-bg'
            });
          }
        );
      }
    });
  }

  showSubProjects(projectId: number): void {
    this.router.navigate(['projects/subProjects/list', projectId]);
  }

  deleteProject(task:any): void {
    console.log("@receivedTask",task);
    this.sweetAlert.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.timeSheetService.deleteTaskTimeSheet(task).subscribe(response => {
            this.sweetAlert.showSuccess(
              'Deleted Successfully',
              `TimeSheet ${task.taskName} deleted !`
            );
            const data = this.dataSource.data;
            _.remove(data, (elem:any) => {
              return elem.id === task.id;
            });
            this.dataSource.data = data;
            this.sort.active = 'startDate';
            this.sort.direction = 'asc';
            //this.dataSource.paginator = this.paginator;
          });
        }
      }
    );
  }

  pushNewProject(project?: any): void {
    // debugger;
    const data = this.dataSource.data;
    const found = data.find((p: any) => p.id === project.id);
    if (found) {
      _.remove(data, (pm: any) => pm.id === project.id);
      data.unshift(project);
    } else {
      data.unshift(project);
    }
    this.dataSource.data = data;
  }

  init() {
    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.filter.valueChanges.debounceTime(300).distinctUntilChanged()
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.timeSheetService.getTimeSheetForTable(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize ? this.paginator.pageSize : 100,
            this.sort.active ? this.sort.active : 'name',
            this.sort.direction ? this.sort.direction : 'asc',
            this.filter.value
          );
        }),
        map((response: any) => {
          console.log('#here', response);
          const pagingHeader = JSON.parse(response.headers.get('X-Pagination'));
          const paging = {
            length: pagingHeader.totalCount,
            pageSize: pagingHeader.pageSize,
            pageIndex: pagingHeader.currentPage - 1
          };
          this.ProjectsLength = pagingHeader.totalCount;
          return response;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.isLoadingResults = false;
        this.dataSource.data = data.body;
      });
  }
  ngOnInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.init();
  }
}
