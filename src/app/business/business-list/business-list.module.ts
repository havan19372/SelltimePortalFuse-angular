import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessListComponent } from './business-list.component';
import { BusinessListService } from './business-list.service';

import { BusinessTableComponent } from './business-table/business-table.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIRouterModule } from 'ng-block-ui/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '../../core/modules/material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollBusinessTableComponent } from './scroll-business-table/scroll-business-table.component';
@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    BlockUIModule,
    InfiniteScrollModule,
    BlockUIHttpModule,
    BlockUIRouterModule,
    MaterialModule
  ],
  declarations: [
    BusinessListComponent,
    BusinessTableComponent,
    BusinessCardComponent,
    ScrollBusinessTableComponent
  ],
  exports: [
    BusinessListComponent,
    BusinessTableComponent,
    BusinessCardComponent
  ],
  providers: [BusinessListService]
})
export class BusinessListModule {}
