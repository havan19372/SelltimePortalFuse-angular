import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseResetPasswordComponent } from './reset-password.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '../../core/modules/material.module';

const routes = [
  {
    path: 'auth/reset-password',
    component: FuseResetPasswordComponent
  }
];

@NgModule({
  declarations: [FuseResetPasswordComponent],
  imports: [FuseSharedModule, MaterialModule, RouterModule.forChild(routes)]
})
export class ResetPasswordModule {}
