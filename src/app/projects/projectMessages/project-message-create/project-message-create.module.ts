import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectMessageCreateComponent } from './project-message-create.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIRouterModule } from 'ng-block-ui/router';
import { BlockUIModule } from 'ng-block-ui';
import { MaterialModule } from 'app/core/modules/material.module';

@NgModule({
  imports: [ 
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    BlockUIModule.forRoot(),
    BlockUIHttpModule.forRoot(),
    BlockUIRouterModule.forRoot()
  ],
  declarations: [ProjectMessageCreateComponent],
  entryComponents: [ProjectMessageCreateComponent]
})
export class ProjectMessageCreateModule {}

