import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLookupComponent } from './add-lookup/add-lookup.component';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { FuseMainComponent } from '../main/main.component';
import { ModuleWithProviders } from '@angular/core';
import { MasterListComponent } from './master-list/master-list.component';
import { DetailsListComponent } from './details-list/details-list.component';

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
        component: MasterListComponent
      },
      {
        path: 'detailList/:id/:text',
        component: DetailsListComponent
      }
    ]
  }
];


export const masterLookupsRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
