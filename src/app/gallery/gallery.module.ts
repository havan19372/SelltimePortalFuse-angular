import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './gallery.routing';

import { FuseSharedModule as SharedModule } from '@fuse/shared.module';
import { FuseMainModule } from '../main/main.module';
import { MaterialModule } from '../core/modules/material.module';

import { GalleryService } from './gallery.service';

import { GalleryCreateModule } from './gallery-create/gallery.create.module';
import { GalleryDeleteModule } from './gallery-delete/gallery-delete.module';
import { GalleryListModule } from './gallery-list/gallery-list.module';
import { GalleryComponent } from './gallery.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FuseMainModule,
    MaterialModule,
    //PdfViewerModule,
    //BrowserModule,
    FormsModule,
    RouterModule.forChild(routes),
    GalleryCreateModule,
    GalleryDeleteModule,
    GalleryListModule
  ],
  exports: [
  ],
  declarations: [
    GalleryComponent
  ],
  providers: [GalleryService]
})
export class GalleryModule { }
