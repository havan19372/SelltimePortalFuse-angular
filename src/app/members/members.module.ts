import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule, MembersRoutedComponents } from './member.routing';
import { FuseSharedModule as SharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/core/modules/material.module';
import { FuseMainModule } from '../main/main.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FuseMainModule,
    MembersRoutingModule
  ],
  declarations: [
    MembersRoutedComponents,
  ],
  // exports: [UsersNewModule]
})
export class MembersModule { }
