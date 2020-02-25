import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TimesheetModel } from './timesheet.model';
import { Subscription } from 'rxjs/Subscription';

import { TimesheetService } from './timesheet.service';
import { ProjectModel } from '../project.model';
import { ProjectService } from '../project.service';
import { Subject } from 'rxjs/Subject';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-project-timesheets',
  templateUrl: './project-timesheets.component.html',
  styleUrls: ['./project-timesheets.component.scss'],
  animations: fuseAnimations
})
export class ProjectTimesheetsComponent implements OnInit, OnDestroy {
  searchInput: FormControl;
  currentTimesheet: TimesheetModel;
  selectedProject: ProjectModel;
  onCurrentTimesheetChanged: Subscription;
  onSelectedProjectChanged: Subscription;

  constructor(
    private timesheetSvc: TimesheetService,
    private projectSvc: ProjectService
  ) {
    this.searchInput = new FormControl('');
  }

  deSelectCurrentTimesheet() {
    this.timesheetSvc.onCurrentTimesheetChanged.next([null, null]);
  }

  getTimesheets(project: ProjectModel): void {
    console.log("#eventEmitter",project);
    this.timesheetSvc.getTimesheetsByProjectId(project);
  }

  showAddTimesheet(): void {
    this.timesheetSvc.onNewTimesheetClicked.next('');
  }

  ngOnInit() {
    this.projectSvc.getProjects();
    this.searchInput.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(searchText => {
        this.timesheetSvc.onSearchTextChanged.next(searchText);
      });

    this.onCurrentTimesheetChanged = this.timesheetSvc.onCurrentTimesheetChanged.subscribe(
      ([currentTimesheet, formType]) => {
        if (!currentTimesheet) {
          this.currentTimesheet = null;
        } else {
          this.currentTimesheet = currentTimesheet;
        }
      }
    );
    this.onSelectedProjectChanged = this.projectSvc.onSelectedProjectChanged.subscribe(
      project => {
        console.log("#ngOnInit",project);
        this.selectedProject = project;
      }
    );
  }

  ngOnDestroy(): void {
    this.onCurrentTimesheetChanged.unsubscribe();
    this.onSelectedProjectChanged.unsubscribe();
  }
}
