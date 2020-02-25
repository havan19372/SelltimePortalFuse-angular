import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuseMainComponent } from '../main/main.component';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { ShoppingCarteListComponent } from './shopping-carte-list/shopping-carte-list.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';

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
        component: ShoppingCarteListComponent,
        canActivate: [AuthorizationGuard]
      }
      ,
    {
        path     : 'detail/:id',
        component: CartDetailsComponent 
    } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCarteRoutingModule {}
