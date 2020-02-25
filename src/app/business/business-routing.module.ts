import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessListService } from './business-list/business-list.service';
import { BusinessCreateComponent } from './business-create/business-create.component';
import { BusinessCreateService } from './business-create/business-create.service';
import { FuseMainComponent } from '../main/main.component';

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
        path: 'create/:id',
        component: BusinessCreateComponent,
        canActivate: [AuthorizationGuard],
        resolve: {
          business: BusinessCreateService
        }
      },
      {
        path: 'list',
        component: BusinessListComponent,
        canActivate: [AuthorizationGuard],
        resolve: {
          members: BusinessListService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {}
