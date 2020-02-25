import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimesheetModel } from '../timesheet.model';
import { Subscription } from 'rxjs/Subscription';
import { TimesheetService } from '../timesheet.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-project-timesheet-list',
  templateUrl: './project-timesheet-list.component.html',
  styleUrls: ['./project-timesheet-list.component.scss'],
  animations: fuseAnimations
})
export class ProjectTimesheetListComponent implements OnInit, OnDestroy {
  timesheets: TimesheetModel[];
  currentTimesheet: TimesheetModel;
  onTimesheetsChanged: Subscription;
  onCurrentTimesheetChanged: Subscription;

  constructor(private timesheetSvc: TimesheetService) {}

  readTimesheet(timesheetId:number): void {
    this.timesheetSvc.getTimeSheetById(timesheetId);
  }
  ngOnInit() {
    this.onTimesheetsChanged = this.timesheetSvc.onTimesheetsChanged.subscribe(
      timesheets => {
        // debugger;
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
