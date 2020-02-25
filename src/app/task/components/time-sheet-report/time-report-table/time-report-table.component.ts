import * as _ from 'lodash';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Subscription } from 'rxjs/Subscription';
import { environment } from 'environments/environment';
import { TimesheetModel } from 'app/task/models/timesheet.model';
import { TimeSheetDataService } from 'app/task/service/time-sheet-data.service';
import { TaskFilterModel } from 'app/task/models/taskFilter.model';
import { AuthenticationService } from 'app/auth/athentication.service';

@Component({
  selector: 'app-time-report-table',
  templateUrl: './time-report-table.component.html',
  styleUrls: ['./time-report-table.component.scss'],
  animations: fuseAnimations

})
export class TimeReportTableComponent implements OnInit {


  displayedColumns = ['id','description','taskName','project', 'completeDate', 'hours'];
  dataSource = new MatTableDataSource();
  imageUrl: string;
  @Input()   timeSheets: TimesheetModel[]=[];
   filterParams: TaskFilterModel;

  shopCartsLength: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoadingResults: boolean=false;

  constructor(
    private router: Router,
    private timeSheetDataServc: TimeSheetDataService,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {
    this.imageUrl = environment.ImageApiUrl;
  }

  getTimeSheets() {
    this.timeSheetDataServc.getTimeSheets(this.filterParams);
  }

  itializeTimeSheetFilter() {
    this.filterParams = {
      pageNumber: 1,
      pageSize: 5000,
      projectId: null,
      projectSubId: null,
      name: '',
      dateFrom: null,
      dateTo: null,
      refNum: null,
      userId:this.authService.isAdmin()?null: this.authService.user.userId
    };
    this.getTimeSheets();
  }


  init() {
    this.isLoadingResults=false;
    this.dataSource.data =  [];
    this.itializeTimeSheetFilter();
    // this.timeSheetDataServc.onTimeSheetList.subscribe(timesheets => {
    //   this.timeSheets = timesheets;
    // })
  }
  ngOnInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.init();
  }


}
