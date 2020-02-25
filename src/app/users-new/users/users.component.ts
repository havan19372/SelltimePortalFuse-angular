import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  OnDestroy
} from '@angular/core';
import { Location } from '@angular/common';

import {
  ActivatedRoute,
  RouterStateSnapshot
} from '@angular/router';
import { UsersService } from './users.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { MemberModel } from 'app/members/member.model';
import { FuseUtils } from '@fuse/utils';


@Component({
  selector: 'users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: fuseAnimations
})
export class UsersComponent implements OnInit, OnDestroy {
  dataSource: FilesDataSource | null;

  pageEvent: PageEvent;
  pageIndex: number | 0;
  pageSize: number | 10;
  length: number;

  routeParams: any;
  memberId: any;
  displayedColumns = ['id', 'name', 'email', 'userName', 'action'];

  member: MemberModel;
  onMemberChanged: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  //  @Input() private memberId: any;

  constructor(private usersService: UsersService, 
    public route: ActivatedRoute,
    private location: Location) {
    this.routeParams = route.snapshot.params;

    console.log('route', route);
    this.memberId = this.routeParams.memberId;
  }
  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  ngOnInit() {
    this.dataSource = new FilesDataSource(
      this.usersService,
      this.paginator,
      this.sort
    );

    this.onMemberChanged = this.usersService.onMemberChanged.subscribe(
      member => {
        // debugger;
        this.member = member;
      }
    );

    console.log(this.member);

    // getServerData(null);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        console.log('this.filter.nativeElement', this.filter.nativeElement);
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  ngOnDestroy(): void {
    this.onMemberChanged.unsubscribe();
  }

  getServerPaginationData(event?: PageEvent) {
    const page = event.pageIndex + 1;

    const paginateFilter = this.usersService.getUsers(page, event.pageSize);
    this.dataSource.filteredData = paginateFilter;
  }

  onDelete(id: any): void
  {
    const user = this.usersService.deleteUser(id);

    if ( user )
    {
      this.usersService.getUsers(1, 10);
    }
  }
}

export class FilesDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  _filteredDataChange = new BehaviorSubject('');

  get filteredData(): any {
    return this._filteredDataChange.value;
  }

  set filteredData(value: any) {
    this._filteredDataChange.next(value);
  }

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(
    private usersService: UsersService,
    private _paginator: MatPaginator,
    private _sort: MatSort
  ) {
    super();
    this.filteredData = this.usersService.users;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.usersService.onUsersChanged,
      this._paginator.page,
      this._filterChange,
      this._sort.sortChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      let data = this.usersService.users.slice();

      data = this.filterData(data);

      this.filteredData = [...data];

      data = this.sortData(data);

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;

      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  filterData(data) {
    if (!this.filter) {
      return data;
    }
    return FuseUtils.filterArrayByString(data, this.filter);
  }

  sortData(data): any[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;

        case 'userName':
          [propertyA, propertyB] = [a.userName, b.userName];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  disconnect() {}
}
