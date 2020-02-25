//import { SettingsComponent } from "./settings.component";
import { AuthorizationGuard } from "app/core/guards/authorization.guard";
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { FuseMainComponent } from "app/main/main.component";
import { SingleTaskComponent } from "./single-task/single-task.component";
import { ProjectTimesheetsComponent } from "app/projects/project-timesheets/project-timesheets.component";
import { ProjectTaskComponent } from "./project-task.component";
import { ProjectTaskTimesheetsListComponent } from "./project-task-timesheets-list/project-task-timesheets-list.component";
import { ProjectProjectsComponent } from "app/projects/project-projects/project-projects.component";
import { TaskTimesheetTableComponent } from "./task-timesheet-table/task-timesheet-table.component";

export const routes: Routes = [
    {
      path: '',
      component: FuseMainComponent,
      canActivate: [AuthorizationGuard],
      pathMatch: 'prefix',
      children: [
        {
          path: '', pathMatch: 'full', redirectTo: 'list'
        },
        {
          path: 'list',
          component: ProjectTaskComponent,
          canActivate: [AuthorizationGuard],
        },
        {
          path: 'timesheetList',
          component: TaskTimesheetTableComponent,
          canActivate: [AuthorizationGuard],
        }, 
      ]
    }
  
  ];
  export const projectTaskRouting: ModuleWithProviders = RouterModule.forChild(
    routes
  );