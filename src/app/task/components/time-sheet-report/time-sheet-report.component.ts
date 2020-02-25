import { filter } from 'rxjs/operators/filter';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatPaginator,
  MatButtonToggleGroup,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { fuseAnimations } from '@fuse/animations';
import { ProjectCreateComponent } from 'app/projects/project-create/project-create.component';
import { ProjectModel } from 'app/projects/project.model';
import { TimeSheetDataService } from 'app/task/service/time-sheet-data.service';
import { TaskFilterModel } from 'app/task/models/taskFilter.model';
import { TimesheetModel } from 'app/projects/project-timesheets/timesheet.model';

@Component({
  selector: 'app-time-sheet-report',
  templateUrl: './time-sheet-report.component.html',
  styleUrls: ['./time-sheet-report.component.scss'],
  animations: fuseAnimations

})
export class TimeSheetReportComponent implements OnInit {
  dialogRef: any;
  searchInput: FormControl;
  @ViewChild(MatButtonToggleGroup) group: MatButtonToggleGroup;
  projectAddDialogRef: MatDialogRef<ProjectCreateComponent, any>;
  isCollapsed = true;
  isLoading = true;
  chart: any = {};
  chartDate: any = [];
  hourSum: any = 0.0;
  notDone: boolean;
  timeSheets: TimesheetModel[] = [];
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private timeSheetDataServc: TimeSheetDataService,
  ) {
    this.chart = {
      legend: false,
      explodeSlices: false,
      labels: true,
      doughnut: false,
      gradient: false,
      scheme: {
        domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
      },
      onSelect: (ev) => {
        console.log(ev);
      }
    };
  }

  isOpenSearch() {
    this.isCollapsed = !this.isCollapsed;
  }
  ngOnInit() {
    this.timeSheetDataServc.onTimeSheetList
    .subscribe(timeSheets => { this.drawTimeSheetsCharts(timeSheets)});
  }
  filterTimeSheet(filterParams: TaskFilterModel) {
    this.isOpenSearch();
    filterParams.pageNumber = 1;
    filterParams.pageSize = 1000;
    this.timeSheetDataServc.getTimeSheets(filterParams);
  }
  ngOnDestroy() { }

  drawTimeSheetsCharts(timeSheets) {
   
      this.timeSheets = timeSheets;
      this.chartDate =
        _(timeSheets)
          .groupBy('projectName')
          .map((objs, key) => ({
            'name': key != "null" ? key : "Other",
            'value': _.sumBy(objs, 'hours')
          }))
          .value();
      this.hourSum = _.sumBy(timeSheets, 'hours');
   

  }
  onNotDoneChange() {
    this.timeSheetDataServc.onTimeSheetList.subscribe(timeSheets => {
      if(this.notDone==true){
        timeSheets= timeSheets.filter(time=>time.done!=this.notDone);
      }
      this.drawTimeSheetsCharts(timeSheets);
    });
  }
}


