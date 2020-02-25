import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIRouterModule } from 'ng-block-ui/router';

import { ProjectTasksRoutingModule } from './project-tasks-routing.module';
import { MaterialModule } from '../../core/modules/material.module';
import { SingleTaskComponent } from './single-task/single-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksService } from './tasks.service';
import { ReactiveFormsModule } from '@angular/forms';
import {TimeAgoPipe} from 'time-ago-pipe';
import { ReversePipe } from '@fuse/pipes/reverse.pipe';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { ProjectListModule } from '../projectMessages/project-list/project-list.module';
import { FilterSidebarComponent } from './tasks-list/filter-sidebar/filter-sidebar.component';
import { CreateTaskComponent } from './tasks-list/create-task/create-task.component';
import { TimesheetsComponent } from './tasks-list/timesheets/timesheets.component';


@NgModule({
  imports: [
    CommonModule,
    BlockUIModule,
    BlockUIHttpModule,
    BlockUIRouterModule,
    FuseSharedModule,
    MaterialModule,
    ProjectTasksRoutingModule,
    ReactiveFormsModule,
    FusePipesModule ,
    ProjectListModule
  ],
  declarations: [TasksListComponent, SingleTaskComponent,TimeAgoPipe, FilterSidebarComponent, CreateTaskComponent, TimesheetsComponent ],
  providers: [TasksService],
  entryComponents:[]
})
export class  TasksModule {}
