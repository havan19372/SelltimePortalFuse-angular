import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimesheetModel } from 'app/task/models/timesheet.model';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { TimeSheetDataService } from 'app/task/service/time-sheet-data.service';

@Component({
  selector: 'app-time-sheet-list',
  templateUrl: './time-sheet-list.component.html',
  styleUrls: ['./time-sheet-list.component.scss'],
  animations: fuseAnimations
})
export class TimeSheetListComponent implements OnInit {
  @Input() timeSheets: TimesheetModel[] = [];
  @Output()
  onEditTimeSheet: EventEmitter<TimesheetModel> = new EventEmitter<TimesheetModel>();
  @Output()
  onDeleteTimeSheet: EventEmitter<number> = new EventEmitter<number>();
  constructor(public dialog: MatDialog,private timeSheetSrvc:TimeSheetDataService) {
    console.log(this.timeSheets);
  }

  ngOnInit() {
  }

  EditTimesheet(timeSheet: TimesheetModel) {
    this.onEditTimeSheet.emit(timeSheet);
  }
  openDeleteConfirmationModal(timesheet: TimesheetModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: timesheet.id,
      title: `Delete Timesheet? `
    };
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(` Dialog was closed`)
      console.log(result)
      if (result == true) {
        this.onDeleteTimeSheet.emit(timesheet.id);
      }
    });
  }

  onMyTimeSheetDoneChange(id,event){
    this.timeSheetSrvc.Done(id,event.checked).subscribe();
  }
}
