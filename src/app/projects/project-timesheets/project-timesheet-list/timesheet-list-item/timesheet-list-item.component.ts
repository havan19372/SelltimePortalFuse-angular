import { Component, OnInit, Input } from '@angular/core';
import { TimesheetModel } from '../../timesheet.model';

@Component({
  selector: 'app-timesheet-list-item',
  templateUrl: './timesheet-list-item.component.html',
  styleUrls: ['./timesheet-list-item.component.scss']
})
export class TimesheetListItemComponent implements OnInit {
  @Input() timesheet: TimesheetModel;

  constructor() {}

  ngOnInit() {}

  deleteTimesheet($event) {}
  editTimesheet($event) {}
}
