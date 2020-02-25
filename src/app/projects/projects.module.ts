import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { FuseSharedModule as SharedModule } from '@fuse/shared.module';
import { FuseMainModule } from '../main/main.module';
import { ProjectListModule } from './projectMessages/project-list/project-list.module';
import { ProjectService } from './project.service';
import { ProjectCreateModule } from './project-create/project-create.module';
import { ProjectMessageCreateModule } from './projectMessages/project-message-create/project-message-create.module';
import { ProjectTimesheetsModule } from './project-timesheets/project-timesheets.module';
import { ProjectProjectsModule } from './project-projects/project-projects.module';
import { ProjectSubProjectsModule } from './project-sub-projects/project-sub-projects.module';
import { MaterialModule } from 'app/core/modules/material.module';
import { TasksModule } from './project-tasks/tasks.module';
import { ProjectTaskModule } from 'app/project-task/project-task.module';
import { ProjectTimesheetListComponent } from './project-timesheets/project-timesheet-list/project-timesheet-list.component';
import { ProjectTimesheetDetailsComponent } from './project-timesheets/project-timesheet-details/project-timesheet-details.component';
import { TimesheetListItemComponent } from './project-timesheets/project-timesheet-list/timesheet-list-item/timesheet-list-item.component';
//import { ProjectTaskComponent } from './project-task/project-task.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FuseMainModule,
    ProjectsRoutingModule,
    ProjectListModule,
    ProjectCreateModule,
    ProjectMessageCreateModule,
    ProjectTimesheetsModule,
    ProjectTaskModule,
    ProjectProjectsModule,
    ProjectSubProjectsModule,
    TasksModule
  ],
  declarations: [
    //ProjectTimesheetListComponent,
    //ProjectTimesheetDetailsComponent,
    //TimesheetListItemComponent
  ],
  providers: [ProjectService]
})
export class ProjectsModule { }
