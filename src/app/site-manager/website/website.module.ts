import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteListComponent } from './website-list/website-list.component';
import { WebsiteService } from './website.service';
import { websiteRouting } from './website.routing';
import { CreateWebsiteComponent } from './create-website/create-website.component';
import { PageModule } from '../page/page.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/core/modules/material.module';
import { ContentListComponent } from 'app/site-manager/content/content-list/content-list.component';
import { ContentService } from '../content/content.service';

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,

    MaterialModule,
    websiteRouting,
    PageModule
  ],
  declarations: [WebsiteListComponent, CreateWebsiteComponent,ContentListComponent],
  providers: [WebsiteService,ContentService],
  entryComponents: [CreateWebsiteComponent,ContentListComponent]
})
export class WebsiteModule {}
