import { Routes, RouterModule } from '@angular/router';

//import { FuseEcommerceProductComponent } from './single/single.component';
//import { EcommerceProductService } from './single/single.service';
import { ModuleWithProviders } from '@angular/core';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { FuseMainComponent } from '../main/main.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { FuseEcommerceProductComponent } from '../products/single/single.component';
import { EcommerceProductService } from '../products/single/single.service';
import { MainPropertyTabComponent } from './single/main-property-tab/main-property-tab.component';
import { PropertyImagesTabComponent } from './single/property-images-tab/property-images-tab.component';
import { SingleComponent } from './single/single.component';
//import { ProductsListComponent } from './products-list/products-list.component';

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
        component: PropertyListComponent,
        canActivate: [AuthorizationGuard],
      
      },
      {
        path: ':id',
        component: SingleComponent,
        canActivate: [AuthorizationGuard],
        resolve: {
          data: EcommerceProductService
        }
      },
      {
        path: ':id/:handle',
        component: SingleComponent,
        canActivate: [AuthorizationGuard],
        resolve: {
          data: EcommerceProductService
        }
      }
    ]
  }

];
export const propertyRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
