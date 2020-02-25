import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { FuseMainComponent } from '../main/main.component';
import { ProjectCardsComponent } from './project-cards/project-cards.component';
import { BoardComponent } from './board/board.component';
import * as fromGuard from './guards';

export const routes: Routes = [
  {
    path: '',
    component: FuseMainComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'board'
      },

      {
        path: 'board',
        canActivate: [fromGuard.ProjectGuard],
        component: ProjectCardsComponent
      },
      {
        path: 'board/:projectId',
        canActivate: [fromGuard.ProjectExistGuard],
        component: BoardComponent
      }
    ]
  }
];
export const ProjectBoardRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
