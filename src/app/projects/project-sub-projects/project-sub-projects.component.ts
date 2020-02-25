import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import {
  MatDialog,
  MatPaginator,
  MatButtonToggleGroup
} from '@angular/material';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { fuseAnimations } from '@fuse/animations';
import { environment } from '../../../environments/environment';
import { ProjectSubProjectsService } from './project-sub-projects.service';

@Component({
  selector: 'app-project-sub-projects',
  templateUrl: './project-sub-projects.component.html',
  styleUrls: ['./project-sub-projects.component.scss'],
  animations: fuseAnimations
})
export class ProjectSubProjectsComponent implements OnInit {
  dialogRef: any;
  searchInput: FormControl;
  @ViewChild(MatButtonToggleGroup) group: MatButtonToggleGroup;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private SubProjectsService: ProjectSubProjectsService
  ) { 
    this.searchInput = new FormControl('');
  }

  newSubProject(subProjectId?: string) {
    if (subProjectId) {
      this.router.navigate(['projects/subProjects/create', subProjectId]);
    } else {
      this.router.navigate(['projects/subProjects/create', 'new']);
    }
  }

  ngOnInit() {
    this.searchInput.valueChanges
    .debounceTime(300)
    .distinctUntilChanged()
    .subscribe(searchText => {
      this.SubProjectsService.getFilteredSubProjects(searchText);
    });
  }

}
