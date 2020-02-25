import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { PageEvent } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
 
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { ApiService } from '../core/services/api.service';
import { MemberModel } from './member.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: fuseAnimations
})
export class MembersComponent implements OnInit {
  // MatPaginator Output
  pageEvent: PageEvent;
  length = 100;
  pageSize = 50;
  pageNumber = 1;
  pageSizeOptions = [5, 10, 25, 100];

  membersList: MemberModel[] = [];
  loader = false;
  memberLength = false;
  memberId: any;
  search = '';
  color = [
    '#2196f3',
    '#4caf50',
    '#607d8b',
    '#ff8f00',
    '#9e7d9c',
    '#1e5682',
    '#5a55fd',
    '#3e739c',
    '#fedb6d',
    '#f11b94',
    '#aef34b',
    '#4baef2',
    '#323f48',
    '#29f8ce',
    '#1e5682',
    '#2196f3',
    '#4caf50',
    '#607d8b',
    '#ff8f00',
    '#9e7d9c',
    '#1e5682',
    '#5a55fd',
    '#3e739c',
    '#2196f3',
    '#4caf50',
    '#607d8b',
    '#ff8f00',
    '#9e7d9c',
    '#1e5682',
    '#5a55fd',
    '#3e739c',
    '#fedb6d',
    '#f11b94',
    '#aef34b',
    '#4baef2',
    '#323f48',
    '#29f8ce',
    '#1e5682',
    '#2196f3',
    '#4caf50',
    '#607d8b',
    '#ff8f00',
    '#9e7d9c',
    '#1e5682',
    '#5a55fd',
    '#3e739c',
    '#2196f3',
    '#4caf50',
    '#607d8b',
    '#ff8f00',
    '#9e7d9c',
    '#1e5682',
    '#5a55fd',
    '#3e739c',
    '#fedb6d',
    '#f11b94',
    '#aef34b',
    '#4baef2',
    '#323f48',
    '#29f8ce',
    '#1e5682',
    '#2196f3',
    '#4caf50',
    '#607d8b',
    '#ff8f00',
    '#9e7d9c',
    '#1e5682',
    '#5a55fd',
    '#3e739c'
  ];
  public imageUrl: string;

  constructor(private ds: ApiService, private router: Router) {
    this.imageUrl = environment.ImageApiUrl;

  }

  ngOnInit() {
    this.getInitialData(1, 50, '');
  }

  onAddClick() {
    const url = 'members/add';
    this.routeChange(url);
  }

  onEditClick(row: any) {
    const url = 'members/edit/' + row['id'];
    this.routeChange(url);
  }

  onUsersClick(row: any) {
    const url = '/users/list';

    console.log('URL', url);
    this.routeChange(url, row['id']);
  }

  routeChange(path: string, data?: any) {
    if (data) {
      this.router.navigate([path, data]);
    } else {
      this.router.navigate([path]);
    }
  }

  getColor(index: any) {
    return this.color[index];
  }

  dataChanged(event) {
    if (event.length) {
      const searchData = event;
      this.getInitialData(1, 50, searchData);
    } else {
      this.getInitialData(1, 50, '');
    }
    console.log('searchvalue', event.length);
  }

  getServerPaginationData(event?: PageEvent) {
    this.memberLength = false;
    const page = event.pageIndex + 1;
    const paginateFilter = this.getInitialData(page, event.pageSize, '');
  }

  private getInitialData(pageNumber: any, pageSize: any, search: any) {
    this.loader = true;
    const url = `Member?pageSize=${pageSize}&pageNumber=${pageNumber}&SearchQuery=${search}`;
    this.ds.get(url).subscribe(response => {
      this.loader = false;
      this.membersList = response;
      this.memberLength = true;
      console.log(this.membersList);
    });
  }
  private getTaskById(pageNumber: any, pageSize: any, search: any) {
    this.loader = true;
    const url = `Task/search?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    this.ds.get(url).subscribe(response => {
      this.loader = false;
      this.membersList = response;
      this.memberLength = true;
      console.log(this.membersList);
    });
  }
}
