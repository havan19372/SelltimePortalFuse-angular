//import { SettingsComponent } from "./settings.component";
import { AuthorizationGuard } from "app/core/guards/authorization.guard";
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { FuseMainComponent } from "app/main/main.component";
import { TaskMainComponent } from "./components/task-main/task-main.component";
import { TimeSheetReportComponent } from "./components/time-sheet-report/time-sheet-report.component";

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
          component: TaskMainComponent,
          canActivate: [AuthorizationGuard],
        } 
        ,
        {
          path: 'report',
          component: TimeSheetReportComponent,
          canActivate: [AuthorizationGuard],
        } 
      ]
    }
  
  ];
  export const TaskRouting: ModuleWithProviders = RouterModule.forChild(
    routes
  );