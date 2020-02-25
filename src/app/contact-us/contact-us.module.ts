import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {
  ContactRoutingModule,
} from './contact-us.routing';

import { FuseMainModule } from '../main/main.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from 'app/core/modules/material.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIRouterModule } from 'ng-block-ui/router';
import { ContactUsService } from './contact-us.service';
import { ContactUsComponent } from 'app/contact-us/contact-us.component';
import { EditContactUsComponent } from 'app/contact-us/edit-contact-us/edit-contact-us.component';
import { AddContactUsComponent } from 'app/contact-us/add-contact-us/add-contact-us.component';
import { AddContactUsNoteComponent } from 'app/contact-us/add-contact-us-note/add-contact-us-note';

@NgModule({
  imports: [
    CommonModule,
    FuseMainModule,
    ContactRoutingModule,
    FuseSharedModule,
    MaterialModule,
    FuseWidgetModule,
    BlockUIModule,
    BlockUIHttpModule,
    FormsModule,
    BlockUIRouterModule
  ],
  declarations: [
    ContactUsComponent,
    AddContactUsComponent,
    EditContactUsComponent,
    AddContactUsNoteComponent
  ],
  entryComponents: [AddContactUsNoteComponent],
  providers: [ContactUsService]
})
export class ContactUsModule {}
