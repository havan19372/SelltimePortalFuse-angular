import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubProjectsCreateComponent } from './sub-projects-create.component';
import { SubProjectsCreateService } from './sub-projects-create.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule } from '@angular/router';
//import { BusinessCreateFormComponent } from './business-create-form/business-create-form.component';
import { BlockUIModule } from 'ng-block-ui';
import { SubProjectsCreateFormComponent } from './sub-projects-create-form/sub-projects-create-form.component'
import { MaterialModule } from 'app/core/modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    BlockUIModule.forRoot(),
    RouterModule
  ],
  declarations: [SubProjectsCreateComponent,SubProjectsCreateFormComponent],
  providers: [SubProjectsCreateService]
})
export class SubProjectsCreateModule { }
