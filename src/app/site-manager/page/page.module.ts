import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePageComponent } from './create-page/create-page.component';
import { PageService } from './page.service';
import { PageViewComponent } from './page-view/page-view.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/core/modules/material.module';

@NgModule({
  imports: [CommonModule, FuseSharedModule, MaterialModule],
  declarations: [CreatePageComponent, PageViewComponent],
  providers: [PageService],
  entryComponents: [CreatePageComponent]
})
export class PageModule {}
