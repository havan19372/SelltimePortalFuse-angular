import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list.component';

import { MainProjectsSidenavComponent } from './main-projects-sidenav/main-projects-sidenav.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { MessageListItemComponent } from './messages-list/message-list-item/message-list-item.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIRouterModule } from 'ng-block-ui/router';

import { ProjectMessageCreateModule } from '../project-message-create/project-message-create.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProjectCreateModule } from '../../project-create/project-create.module';
import { MaterialModule } from 'app/core/modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    BlockUIModule.forRoot(),
    BlockUIHttpModule.forRoot(),
    BlockUIRouterModule.forRoot(),
    ProjectCreateModule,
    ProjectMessageCreateModule
  ],
  declarations: [
    ProjectListComponent,
    MainProjectsSidenavComponent,
    MessagesListComponent,
    MessageListItemComponent,
    MessageDetailsComponent
  ],
  exports: [MainProjectsSidenavComponent]
})
export class ProjectListModule {}
