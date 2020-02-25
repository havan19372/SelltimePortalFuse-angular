import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { ProjectCardsComponent } from './project-cards/project-cards.component';
import {  ProjectBoardRouting } from './project-board-routing.module';
import { MaterialModule } from '../core/modules/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseMainModule } from '../main/main.module';
import {StoreModule}from '@ngrx/store';

import { ProjectsCardService } from './projects-card.service';
import { reducers, effects } from './state';
import { EffectsModule } from '@ngrx/effects';
import { BoardComponent } from './board/board.component';

import * as fromGuard from './guards';
import { BoardListComponent } from './board/board-list/board-list.component';
import { AddCardComponent } from './board/board-list/add-card/add-card.component';
import { AddListComponent } from './board/add-list/add-list.component';
import { TaskCardComponent } from './board/board-list/task-card/task-card.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TasksService } from "app/projects/project-tasks/tasks.service";
import { ProjectService } from 'app/projects/project.service';
import { SingleTaskComponent } from './single-task/single-task.component';
import { CommentSingleComponent } from './board/board-list/comment-single/comment-single.component';
import { TaskFilterComponent } from './board/task-filter/task-filter.component';


@NgModule({
  imports: [
    FuseSharedModule,
    CommonModule,
    MaterialModule,
    FuseMainModule,
    ProjectBoardRouting,
    NgxDnDModule,
    DragDropModule,
    StoreModule.forFeature('projectBoard',reducers),
    EffectsModule.forFeature(effects),

  ],
  declarations: [ ProjectCardsComponent, BoardComponent, BoardListComponent, AddCardComponent, AddListComponent, TaskCardComponent, SingleTaskComponent, CommentSingleComponent, TaskFilterComponent],
  providers:[ProjectsCardService,TasksService,ProjectService, ...fromGuard.guards],
  entryComponents:[SingleTaskComponent, CommentSingleComponent]
})
export class ProjectBoardModule { }
