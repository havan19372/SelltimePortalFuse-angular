import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { ProjectTimesheetListComponent } from 'app/projects/project-timesheets/project-timesheet-list/project-timesheet-list.component';
import { ProjectTimesheetDetailsComponent } from 'app/projects/project-timesheets/project-timesheet-details/project-timesheet-details.component';
import { TimesheetListItemComponent } from 'app/projects/project-timesheets/project-timesheet-list/timesheet-list-item/timesheet-list-item.component';
import { MaterialModule } from 'app/core/modules/material.module';

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        FusePipesModule
    ],
    declarations:[ProjectTimesheetListComponent,
        ProjectTimesheetDetailsComponent,
        TimesheetListItemComponent],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        FusePipesModule,
        ProjectTimesheetListComponent,
        ProjectTimesheetDetailsComponent,
        TimesheetListItemComponent
    ],
})
export class FuseSharedModule
{
}
