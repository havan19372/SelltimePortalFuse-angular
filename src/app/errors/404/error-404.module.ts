import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseError404Component } from './error-404.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/core/modules/material.module';

const routes = [
    {
        path     : 'errors/error-404',
        component: FuseError404Component
    }
];

@NgModule({
    declarations: [
        FuseError404Component
    ],
    imports     : [
        FuseSharedModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ]
    
})

export class Error404Module
{

}
