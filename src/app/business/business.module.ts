import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessListModule } from './business-list/business-list.module';
import { BusinessCreateModule } from './business-create/business-create.module';
import { FuseMainModule } from '../main/main.module';
import { MaterialModule } from '../core/modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FuseMainModule,
    BusinessRoutingModule,
    BusinessListModule,
    BusinessCreateModule
  ],
  declarations: [],
})
export class BusinessModule {}
