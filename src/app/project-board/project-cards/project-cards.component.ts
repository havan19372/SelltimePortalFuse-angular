import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { ProjectsBoard, Paging } from '../project-board.model';

import * as fromStore from '../state';
import { Store } from '@ngrx/store';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-project-cards',
  templateUrl: './project-cards.component.html',
  styleUrls: ['./project-cards.component.scss'],
  animations: [
    fuseAnimations,
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('rotated', style({ transform: 'rotate(360)' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('rotated => default', animate('800ms ease-out')),
      transition('default => rotated', animate('800ms ease-in'))
    ])
  ]
})
export class ProjectCardsComponent implements OnInit {
  projects: ProjectsBoard[];
  errorMessage$: Observable<string>;
  paging: Paging;
  loadMoreShow: boolean = true;
  state: string = 'default';

  onProjectsChanges: Subscription;
  onPagingChanges: Subscription;
  constructor(private store: Store<fromStore.ProjectBoardState>) {
    this.paging = {
      pageNumber: 1,
      pageSize: 5
    };
  }

  loadMore(): void {
    this.state = this.state === 'default' ? 'rotated' : 'default';

    // {"length":12,"pageSize":10,"pageIndex":0}
    if (this.projects.length < this.paging.totalItems) {
      this.paging.pageNumber = this.paging.pageNumber + 1;
      this.store.dispatch(new fromStore.LoadProject(this.paging));
    }
  }

  newProject(): void {}

  ngOnInit() {
    this.onProjectsChanges = this.store
      .select(fromStore.getAllProjects)
      .subscribe(projects => {
        this.projects = projects;
      });
    this.onPagingChanges = this.store
      .select(fromStore.getProjectsPaging)
      .subscribe(paging => {
        this.paging = paging;
        this.loadMoreShow = this.projects.length < this.paging.totalItems;
        //  this.state = 'rotated';
      });
  }

  ngOnDestroy(): void {
    this.onPagingChanges.unsubscribe();
    this.onProjectsChanges.unsubscribe();
  }
}
