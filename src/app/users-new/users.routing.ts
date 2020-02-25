import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { ModuleWithProviders } from '@angular/core';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
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
        path: 'list/:memberId',
        component: UsersComponent,
        canActivate: [AuthorizationGuard],
        resolve: {
          data: UsersService
        }
      },
      {
        path: ':id/:memberId',
        component: UserComponent,
        canActivate: [AuthorizationGuard],
        resolve: {
          data: UserService
        }
      },
    ]
  }

];
export const usersNewRouting: ModuleWithProviders = RouterModule.forChild(
  routes
);
