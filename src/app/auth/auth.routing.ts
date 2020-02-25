import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthMainComponent } from './auth-main/auth-main.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthMainComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'login'
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      },
      // {
      //   path: 'register',
      //   loadChildren: './register/register.module#RegisterModule'
      // },
      {
        path: 'forgot-password',
        loadChildren:
          './forgot-password/forgot-password.module#ForgotPasswordModule'
      },
      {
        path: 'lock',
        loadChildren: './lock/lock.module#LockModule'
      }
    ]
  }

];

export const authRouting: ModuleWithProviders = RouterModule.forChild(routes);
