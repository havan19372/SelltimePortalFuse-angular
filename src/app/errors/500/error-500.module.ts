import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseError500Component } from './error-500.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/core/modules/material.module';

const routes = [
    {
        path     : 'errors/error-500',
        component: FuseError500Component
    }
];

@NgModule({
    declarations: [
        FuseError500Component
    ],
    imports     : [
        FuseSharedModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ]
})

export class Error500Module
{

}
