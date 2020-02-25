import { SettingsComponent } from "./settings.component";
import { AuthorizationGuard } from "app/core/guards/authorization.guard";
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { FuseMainComponent } from "app/main/main.component";

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
          component: SettingsComponent,
          canActivate: [AuthorizationGuard],
        }, 
      ]
    }
  
  ];
  export const settingRouting: ModuleWithProviders = RouterModule.forChild(
    routes
  );