import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { FuseSharedModule } from '@fuse/shared.module';
import { BlockUIRouterModule } from 'ng-block-ui/router';
import { GalleryListComponent } from './gallery-list.component';
import { GallerySidenavComponent } from './sidenav/gallery-sidenav.component';
import { NgxMasonryModule } from 'ngx-masonry';
import {MatGridListModule} from '@angular/material/grid-list';
import { MaterialModule } from '../../core/modules/material.module';
import { ImageResizerDialogComponent } from './image-resizer-dialog/image-resizer-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    NgxMasonryModule,
    PdfViewerModule,
    BlockUIModule.forRoot(),
    BlockUIHttpModule.forRoot(),
    BlockUIRouterModule.forRoot(),
    MatGridListModule
  ],
  declarations: [
    GalleryListComponent,
    GallerySidenavComponent,
    ImageResizerDialogComponent
  ],
  entryComponents: [ImageResizerDialogComponent]
})
export class GalleryListModule {}
