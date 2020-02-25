import { Component, OnInit, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TimesheetModel } from 'app/projects/project-timesheets/timesheet.model';
import { Subscription } from 'rxjs';
import { TimesheetService } from 'app/projects/project-timesheets/timesheet.service';

@Component({
  selector: 'app-project-task-timesheets-list',
  templateUrl: './project-task-timesheets-list.component.html',
  styleUrls: ['./project-task-timesheets-list.component.scss'],
  animations: fuseAnimations
})
export class ProjectTaskTimesheetsListComponent implements OnInit,OnDestroy {
  timesheets: TimesheetModel[];
  currentTimesheet: TimesheetModel;
  onTimesheetsChanged: Subscription;
  onCurrentTimesheetChanged: Subscription;
  constructor(private timesheetSvc: TimesheetService) {}

  readTimesheet(timesheetId:number): void {
    debugger
    this.timesheetSvc.getTimeSheetById(timesheetId);
  }
  ngOnInit() {
    this.onTimesheetsChanged = this.timesheetSvc.onTimesheetsChanged.subscribe(
      timesheets => {
        debugger;
        this.timesheets = timesheets;
      }
    );
    this.onCurrentTimesheetChanged = this.timesheetSvc.onCurrentTimesheetChanged.subscribe(
      timesheet => {
        this.currentTimesheet = timesheet;
      }
    );
  }
  ngOnDestroy(): void {
    this.onTimesheetsChanged.unsubscribe();
    this.onCurrentTimesheetChanged.unsubscribe();
  }
}
