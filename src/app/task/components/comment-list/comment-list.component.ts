 


import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimesheetModel } from 'app/task/models/timesheet.model';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { TimeSheetDataService } from 'app/task/service/time-sheet-data.service';
import { CommentModel } from '../../models/comment.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  animations: fuseAnimations
})
export class CommentListComponent implements OnInit {
  @Input() comments: CommentModel[] = [];
  @Output()
  onEditComment: EventEmitter<TimesheetModel> = new EventEmitter<TimesheetModel>();
  @Output()
  onDeleteComment: EventEmitter<number> = new EventEmitter<number>();

  constructor(public dialog: MatDialog, private timeSheetSrvc: TimeSheetDataService) {
  }

  ngOnInit() {
    console.log(this.comments);
  }

  EditTimesheet(timeSheet: TimesheetModel) {
    this.onEditComment.emit(timeSheet);
  }
  openDeleteConfirmationModal(timesheet: TimesheetModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: timesheet.id,
      title: `Delete Comment? `
    };
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(` Dialog was closed`)
      console.log(result)
      if (result == true) {
        this.onDeleteComment.emit(timesheet.id);
      }
    });
  }

 
}
