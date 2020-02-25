import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectProjectsComponent } from './project-projects.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIRouterModule } from 'ng-block-ui/router';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { ProjectProjectsService } from './project-projects.service';

import { ProjectProjectsRoutingModule } from './project-projects-routing.module';
import { MaterialModule } from 'app/core/modules/material.module';
import { ProjectCreateModule } from '../project-create/project-create.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectProjectsRoutingModule,
    FuseSharedModule,
    MaterialModule,
    BlockUIModule,
    BlockUIHttpModule,
    BlockUIRouterModule,
    ProjectCreateModule
  ],
  declarations: [ProjectProjectsComponent, ProjectsTableComponent],
  providers: [ProjectProjectsService]
})
export class ProjectProjectsModule {}
