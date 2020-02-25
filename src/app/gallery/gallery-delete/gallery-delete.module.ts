import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { GalleryDeleteComponent } from './gallery-delete.component';
import { MaterialModule } from 'app/core/modules/material.module';

@NgModule({
  imports: [CommonModule, FuseSharedModule, MaterialModule],
  declarations: [GalleryDeleteComponent],
  entryComponents: [GalleryDeleteComponent]
})
export class GalleryDeleteModule {}
