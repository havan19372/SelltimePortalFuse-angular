import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessCreateComponent } from './business-create.component';
import { BusinessCreateService } from './business-create.service';
import { RouterModule } from '@angular/router';
import { BusinessCreateFormComponent } from './business-create-form/business-create-form.component';
import { BlockUIModule } from 'ng-block-ui';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '../../core/modules/material.module';
import { BusinessViewInEditModeComponent } from './business-view-in-edit-mode/business-view-in-edit-mode.component';
@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    BlockUIModule.forRoot(),
    RouterModule,
    MaterialModule
  ],
  declarations: [BusinessCreateComponent, BusinessCreateFormComponent, BusinessViewInEditModeComponent],
  exports: [BusinessCreateComponent, BusinessCreateFormComponent],
  providers: [BusinessCreateService]
})
export class BusinessCreateModule {}
