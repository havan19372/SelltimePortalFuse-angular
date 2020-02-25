import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIRouterModule } from 'ng-block-ui/router';
import { ProjectSubProjectsRoutingModule } from './project-sub-projects-routing.module';
import { ProjectSubProjectsComponent } from './project-sub-projects.component';
import { SubProjectsTableComponent } from './sub-projects-table/sub-projects-table.component';
import { ProjectSubProjectsService } from './project-sub-projects.service';
import { SubProjectsCreateModule } from '././sub-projects-create/sub-projects-create.module';
import { MaterialModule } from 'app/core/modules/material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    ProjectSubProjectsRoutingModule,
    FuseSharedModule,
    RouterModule,
    MaterialModule,
    BlockUIModule,
    BlockUIHttpModule,
    BlockUIRouterModule,
    SubProjectsCreateModule
  ],
  declarations: [ProjectSubProjectsComponent, SubProjectsTableComponent],
  providers: [ProjectSubProjectsService]
})
export class ProjectSubProjectsModule { }
