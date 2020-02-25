import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryCreateComponent } from './gallery.create.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/core/modules/material.module';


@NgModule({
  imports: [CommonModule, FuseSharedModule,MaterialModule],
  declarations: [GalleryCreateComponent],
  entryComponents: [GalleryCreateComponent]
})
export class GalleryCreateModule {}
