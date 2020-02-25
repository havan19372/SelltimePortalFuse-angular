import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuseMainComponent } from '../main/main.component';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { ProjectListComponent } from './projectMessages/project-list/project-list.component';
import { ProjectTimesheetsComponent } from './project-timesheets/project-timesheets.component';
import { ProjectProjectsComponent } from './project-projects/project-projects.component';
import { ProjectSubProjectsComponent } from './project-sub-projects/project-sub-projects.component';
import { TasksListComponent } from './project-tasks/tasks-list/tasks-list.component';
import { SingleTaskComponent } from './project-tasks/single-task/single-task.component';

const routes: Routes = [
  {
    path: '',
    component: FuseMainComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ProjectListComponent,
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'timesheets',
        component: ProjectTimesheetsComponent,
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'projects',
        component: ProjectProjectsComponent,
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'subProjects',
        component: ProjectSubProjectsComponent,
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'tasks',
        component: TasksListComponent,
        canActivate: [AuthorizationGuard]
      }
      ,
      {
        path: 'task/:id',
        component: SingleTaskComponent,
        canActivate: [AuthorizationGuard] 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
