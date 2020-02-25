import { NgModule } from '@angular/core';
import { Error404Module } from './404/error-404.module';
import { Error500Module } from './500/error-500.module';
import { MaterialModule } from '../core/modules/material.module';
import { FuseSharedModule } from '@fuse/shared.module';



@NgModule({
  imports: [
    Error404Module,
    Error500Module,
    MaterialModule,
    FuseSharedModule,
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class ErrorsModule { }

