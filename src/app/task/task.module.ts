import { TaskService } from './service/Task.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskMainComponent } from './components/task-main/task-main.component';
import { SingleTaskComponent } from './components/single-task/single-task.component';
import { TaskSidenavComponent } from './components/task-sidenav/task-sidenav.component';
import { TimeSheetListComponent } from './components/time-sheet-list/time-sheet-list.component';
import { SingleTimesheetComponent } from './components/single-timesheet/single-timesheet.component';
import { FuseSharedModule as SharedModule, FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/core/modules/material.module';
import { FuseMainModule } from 'app/main/main.module';
import { FuseWidgetModule } from '@fuse/components';
import { TaskRouting } from './task.route';
import { StoreModule } from '@ngrx/store';
import * as fromTaskState from './+state';
import { EffectsModule } from '@ngrx/effects';
import { TaskLookupService } from './service/task-lookup.service';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { UserService } from 'app/users-new/user/user.service';
import { AuthenticationService } from 'app/auth/athentication.service';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { TimeSheetReportComponent } from './components/time-sheet-report/time-sheet-report.component';
import { TimeReportTableComponent } from './components/time-sheet-report/time-report-table/time-report-table.component'; // this line you need
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentDataService } from './service/comment-data.service';
import { CommentSingleComponent } from './components/comment-single/comment-single.component';
import { AttachmentComponent } from './components/attachment/attachment.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CommonModule,
    FuseMainModule,
    NgxChartsModule,
    FuseWidgetModule,
    TaskRouting,
    StoreModule.forFeature('task', fromTaskState.TaskReducer),
    EffectsModule.forFeature([fromTaskState.TaskEffects]),
    AmazingTimePickerModule


  ],
  declarations: [TaskMainComponent, SingleTaskComponent, TaskSidenavComponent, TimeSheetListComponent, SingleTimesheetComponent, TaskFilterComponent, DeleteConfirmationComponent, TimeSheetReportComponent, TimeReportTableComponent, CommentListComponent, CommentSingleComponent, AttachmentComponent],
  providers: [TaskService, TaskLookupService, AuthenticationService, CommentDataService],
  entryComponents:[SingleTaskComponent,SingleTimesheetComponent,DeleteConfirmationComponent,CommentSingleComponent]
})
export class TaskModule { }
