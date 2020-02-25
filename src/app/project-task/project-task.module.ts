import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/core/modules/material.module';
import { FuseMainModule } from 'app/main/main.module';
import { FuseWidgetModule } from '@fuse/components';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BlockUIModule } from 'ng-block-ui';
import { FuseSharedModule as SharedModule, FuseSharedModule } from '@fuse/shared.module';
import { projectTaskRouting } from './project-task.route';
import { SingleTaskComponent } from './single-task/single-task.component';
import { ProjectListModule } from 'app/projects/projectMessages/project-list/project-list.module';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIRouterModule } from 'ng-block-ui/router';
import { TasksService } from 'app/projects/project-tasks/tasks.service';
import { ProjectService } from 'app/projects/project.service';
import { ProjectTaskComponent } from './project-task.component';
import { MainTasksSidenavComponent } from './main-tasks-sidenav/main-tasks-sidenav.component';
import { TimesheetService } from 'app/projects/project-timesheets/timesheet.service';
import { ProjectTaskTimesheetsDetailsComponent } from './project-task-timesheets-details/project-task-timesheets-details.component';
import { ProjectTaskTimesheetsListComponent } from './project-task-timesheets-list/project-task-timesheets-list.component';
import { TimesheetsTaskListItemComponent } from './project-task-timesheets-list/timesheets-task-list-item/timesheets-task-list-item.component';
import { TaskTimesheetTableComponent } from './task-timesheet-table/task-timesheet-table.component';
import { TimesheetTableComponent } from './task-timesheet-table/timesheet-table/timesheet-table.component';
import { ProjectProjectsService } from 'app/projects/project-projects/project-projects.service';
import { SearchFilterComponent } from './../search-filter/search-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { UserService } from 'app/users-new/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    projectTaskRouting,
    SharedModule,
    MaterialModule,
    CommonModule,
    FuseMainModule,
    FuseWidgetModule,
    NgxChartsModule,
    ProjectListModule,
    NgxMaterialTimepickerModule.forRoot(),//added
    BlockUIModule,
    BlockUIHttpModule,
    BlockUIRouterModule,
    FuseSharedModule,
  ],
  declarations: [SingleTaskComponent, ProjectTaskComponent, MainTasksSidenavComponent, ProjectTaskTimesheetsDetailsComponent, ProjectTaskTimesheetsListComponent, TimesheetsTaskListItemComponent, TaskTimesheetTableComponent, TimesheetTableComponent, SearchFilterComponent],
  providers:[TasksService,ProjectService,TimesheetService,ProjectProjectsService,UserService],
  entryComponents: [SingleTaskComponent]
})
export class ProjectTaskModule { }
