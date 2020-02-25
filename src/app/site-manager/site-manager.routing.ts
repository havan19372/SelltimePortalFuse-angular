import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FuseMainComponent } from '../main/main.component';
import { AuthorizationGuard } from '../core/guards/authorization.guard';

export const routes: Routes = [
  {
    path: '',
    component: FuseMainComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'prefix',
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'websites'
      },
      {
        path: 'websites',
        loadChildren: './website/website.module#WebsiteModule'
      },
      {
        path: 'contents',
        loadChildren: './content/content.module#ContentModule'
      }
    ]
  }

];

export const siteManagerRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
