import { NgModule } from '@angular/core';

import { FuseLockComponent } from './lock.component';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '../../core/modules/material.module';

const routes: Routes = [
  {
    path: '',
    component: FuseLockComponent
  }
];

@NgModule({
  declarations: [FuseLockComponent],
  imports: [FuseSharedModule, MaterialModule, RouterModule.forChild(routes)]
})
export class LockModule {}
