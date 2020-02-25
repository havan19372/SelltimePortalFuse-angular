import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from '../../core/guards/authorization.guard';
import { ProjectProjectsComponent } from './project-projects.component'
import { ProjectProjectsService } from './project-projects.service';
import { FuseMainComponent } from '../../main/main.component';

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
        component: ProjectProjectsComponent,
        canActivate: [AuthorizationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectProjectsRoutingModule { }
