import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteModule } from './website/website.module';
import { siteManagerRouting } from './site-manager.routing';
import { PageModule } from './page/page.module';
import { ContentModule } from './content/content.module';
import { FuseMainModule } from '../main/main.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { SingleWebsiteComponent } from './single-website/single-website.component';

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    FuseMainModule,

    PageModule,
    siteManagerRouting,

  ],
  declarations: [SingleWebsiteComponent]
})
export class SiteManagerModule { }
