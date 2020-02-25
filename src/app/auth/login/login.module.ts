import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '../../core/modules/material.module';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];



@NgModule({
  declarations: [LoginComponent],
  imports: [FuseSharedModule, MaterialModule, RouterModule.forChild(routes)],
  providers: []
})
export class LoginModule {}
