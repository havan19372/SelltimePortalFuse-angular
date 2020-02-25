import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WebsiteListComponent } from './website-list/website-list.component';

export const routes: Routes = [
  {
    path: 'list',
    component: WebsiteListComponent
  }
];

export const websiteRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
