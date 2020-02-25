import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCreateComponent } from './project-create.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/core/modules/material.module';
@NgModule({
  imports: [CommonModule, FuseSharedModule, MaterialModule],
  declarations: [ProjectCreateComponent],
  entryComponents: [ProjectCreateComponent]
})
export class ProjectCreateModule {}
