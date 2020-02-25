import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from '../../core/guards/authorization.guard';
import { ProjectSubProjectsComponent } from './project-sub-projects.component'
import { ProjectSubProjectsService } from './project-sub-projects.service';
import { SubProjectsCreateComponent } from './sub-projects-create/sub-projects-create.component';
import { SubProjectsCreateService } from './sub-projects-create/sub-projects-create.service';
import { FuseMainComponent } from '../../main/main.component';

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
        path: 'subProjects/create/:id',
        component: SubProjectsCreateComponent,
        canActivate: [AuthorizationGuard],
        resolve: {
          project: SubProjectsCreateService
        }
      },
      {
        path: 'subProjects/list/:projectId',
        component: ProjectSubProjectsComponent,
        canActivate: [AuthorizationGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectSubProjectsRoutingModule { }
