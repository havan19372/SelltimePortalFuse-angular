import { NgModule } from '@angular/core';

import { ForgotPasswordComponent } from './forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '../../core/modules/material.module';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [FuseSharedModule, MaterialModule, RouterModule.forChild(routes)]
})
export class ForgotPasswordModule {}
