import { LookUpService } from './../core/services/look-up.service';
import { NgModule } from '@angular/core';
import { FuseSharedModule as SharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/core/modules/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

import { masterLookupsRouting } from './master-lookups.routing';
import { AgmCoreModule } from '@agm/core';
import { FuseMainModule } from '../main/main.module';
import { BlockUIModule } from 'ng-block-ui';
import { AddLookupComponent } from './add-lookup/add-lookup.component';

import { MasterListComponent } from './master-list/master-list.component';
import { MasterListService } from './master-list/master-list.service';
import { DetailsListComponent } from './details-list/details-list.component';
import { DetailsListService } from './details-list/details-list.service';
import { AddDetailComponent } from './add-detail/add-detail.component';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FuseMainModule,
    MaterialModule,
    masterLookupsRouting,

    BlockUIModule.forRoot()
  ],
  declarations: [

    AddLookupComponent,
    AddDetailComponent,
    MasterListComponent,
    DetailsListComponent
  ],
  entryComponents: [AddLookupComponent, AddDetailComponent],
  providers: [MasterListService, DetailsListService]
})
export class MasterLookupsModule { }
