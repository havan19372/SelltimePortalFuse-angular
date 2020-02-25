import * as _ from 'lodash';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router,  ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProjectSubProjectsService } from '../project-sub-projects.service';
import { fuseAnimations } from '@fuse/animations';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { ProjectModel } from '../../project.model';
import { SweetAlertService } from '../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-sub-projects-table',
  templateUrl: './sub-projects-table.component.html',
  styleUrls: ['./sub-projects-table.component.scss'],
  animations: fuseAnimations
})
export class SubProjectsTableComponent implements OnInit {
  @Input() filter: any;
  @Output() callNewSubProject: EventEmitter<any> = new EventEmitter();

  displayedColumns = ['name', 'StartDate', 'CompleteDate', 'options'];
  dataSource = new MatTableDataSource();
  imageUrl: string;
  SubProjectsLength: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private SubProjectService: ProjectSubProjectsService,
    private sweetAlert: SweetAlertService,
  ) {}

  newSubProject(SubProjectId?: string) {
    this.callNewSubProject.emit(SubProjectId);
  }

  deleteSubProject(SubProject: ProjectModel): void {
    this.sweetAlert.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.SubProjectService.deleteSubProject(SubProject).subscribe(
            response => {
              this.sweetAlert.showSuccess(
                'Deleted Successfully',
                `SubProject ${SubProject.name} deleted !`
              );
              const data = this.dataSource.data;
              _.remove(data, (elem: ProjectModel) => {
                return elem.id === SubProject.id;
              });
              debugger;
              console.log('here', data, this.paginator);
              this.dataSource.data = data;
              this.init();
              //this.dataSource.paginator = this.paginator;
            }
          );
        }
      }
    );
  }

  init() {
    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.filter.valueChanges.debounceTime(300).distinctUntilChanged()
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          debugger;
          return this.SubProjectService.getSubProjectsForTable(
            this.route.snapshot.params.projectId,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize ? this.paginator.pageSize : 10,
            this.sort.active ? this.sort.active : 'name',
            this.sort.direction ? this.sort.direction: 'asc',
            this.filter.value
          );
        }),
        map((response: any) => {
          console.log('here', response);
          const pagingHeader = JSON.parse(response.headers.get('X-Pagination'));
          const paging = {
            length: pagingHeader.totalCount,
            pageSize: pagingHeader.pageSize,
            pageIndex: pagingHeader.currentPage - 1
          };
          this.SubProjectsLength = pagingHeader.totalCount;

          return response;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.dataSource.data = data.body;
      });
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    //console.log('projects',this.ProjectService.projects);
    this.init();
  }
}
