import { Routes, RouterModule } from '@angular/router';

import { FuseEcommerceProductComponent } from './single/single.component';
import { EcommerceProductService } from './single/single.service';
import { ModuleWithProviders } from '@angular/core';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { FuseMainComponent } from '../main/main.component';
import { ProductsListComponent } from './products-list/products-list.component';

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
        component: ProductsListComponent,
        canActivate: [AuthorizationGuard],
      
      },
      {
        path: ':id',
        component: FuseEcommerceProductComponent,
        canActivate: [AuthorizationGuard],
        resolve: {
          data: EcommerceProductService
        }
      },
      {
        path: ':id/:handle',
        component: FuseEcommerceProductComponent,
        canActivate: [AuthorizationGuard],
        resolve: {
          data: EcommerceProductService
        }
      }
    ]
  }

];
export const productRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
