import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { MailConfirmComponent } from './mail-confirm.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '../../core/modules/material.module';

const routes = [
  {
    path: 'auth/mail-confirm',
    component: MailConfirmComponent
  }
];

@NgModule({
  declarations: [MailConfirmComponent],
  imports: [FuseSharedModule, MaterialModule, RouterModule.forChild(routes)]
})
export class MailConfirmModule {}
