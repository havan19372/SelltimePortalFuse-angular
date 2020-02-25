import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { FuseMainComponent } from '../main/main.component';
import { DashboardService } from './dashboard.service';

export const routes: Routes = [
  {
    path: '',
    component: FuseMainComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'prefix',
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'main'
      },
      {
        path: 'main',
        component: DashboardComponent,
        resolve  : {
            data: DashboardService
        }
      }
    ]
  }

];

export const DashboardRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
