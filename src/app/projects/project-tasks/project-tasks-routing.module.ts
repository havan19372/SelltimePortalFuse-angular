import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FuseMainComponent } from '../../main/main.component';
import { AuthorizationGuard } from 'app/core/guards/authorization.guard';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { TimesheetsComponent } from './tasks-list/timesheets/timesheets.component';


const routes: Routes = [
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
        component: TasksListComponent,
        canActivate: [AuthorizationGuard]
      },
      
      {
        path: ':id',
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
export class ProjectTasksRoutingModule { }
