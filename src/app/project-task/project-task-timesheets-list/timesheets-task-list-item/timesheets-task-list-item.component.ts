import { Component, OnInit, Input } from '@angular/core';
import { TimesheetModel } from 'app/projects/project-timesheets/timesheet.model';
import { TimesheetService } from 'app/projects/project-timesheets/timesheet.service';
@Component({
  selector: 'app-timesheets-task-list-item',
  templateUrl: './timesheets-task-list-item.component.html',
  styleUrls: ['./timesheets-task-list-item.component.scss']
})
export class TimesheetsTaskListItemComponent implements OnInit {
  @Input() timesheet: TimesheetModel;
  constructor(private timeSheetSvc:TimesheetService) {}
  ngOnInit() {
  }
  deleteTimesheet()
  {
    this.timeSheetSvc.deleteTimeSheet(this.timesheet.id);
  }
  editTimesheet($event) {}
}