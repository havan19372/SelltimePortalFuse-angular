import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTimesheetsComponent } from './project-timesheets.component';
import { FuseSharedModule } from '@fuse/shared.module';

import { FuseSharedModule as SharedModule } from '@fuse/shared.module';
import { ProjectListModule } from '../projectMessages/project-list/project-list.module';
import { TimesheetService } from './timesheet.service';
import { ProjectTimesheetListComponent } from './project-timesheet-list/project-timesheet-list.component';
import { ProjectTimesheetDetailsComponent } from './project-timesheet-details/project-timesheet-details.component';
import { TimesheetListItemComponent } from './project-timesheet-list/timesheet-list-item/timesheet-list-item.component';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIRouterModule } from 'ng-block-ui/router';
import { MaterialModule } from 'app/core/modules/material.module';
@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    ProjectListModule,
    BlockUIModule,
    BlockUIHttpModule,
    BlockUIRouterModule
  ],
  declarations: [ProjectTimesheetsComponent],
  exports: [ProjectTimesheetsComponent],
  providers: [TimesheetService]
})
export class ProjectTimesheetsModule {}
