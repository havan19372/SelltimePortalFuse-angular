import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';

import { DashboardRouting } from '../dashboard/dashboard.routing';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardService } from './dashboard.service';
import { FuseMainModule } from '../main/main.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from '../core/modules/material.module';
import { UserService } from 'app/users-new/user/user.service';


@NgModule({
    declarations: [
        DashboardComponent
],
    imports     : [
        FuseSharedModule,
        MaterialModule,
        DashboardRouting,
        CommonModule,
        FuseWidgetModule,
        NgxChartsModule,
        FuseMainModule 
    ],
    exports     : [
        DashboardComponent
    ],
    providers   : [
        DashboardService,
        UserService
    ]
})

export class DashboardModule
{
}
