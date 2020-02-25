import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../core/services/api.service';
import { AuthenticationService } from '../../auth/athentication.service';
import { HttpClient } from '@angular/common/http';
import { IBusinessModel } from '../business.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Injectable()
export class BusinessListService {
  onSelectedBusinessChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  onPagingChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onSearchTextChanged: Subject<any> = new Subject();
  onFilterChanged: Subject<any> = new Subject();
  onBusinessChanged: BehaviorSubject<any> = new BehaviorSubject({});

  Businesses: any[] = [];
  searchText: string;
  filterBy: string;

  paging: {
    pageIndex: number;
    pageSize: number;
    length: number;
  };

  @BlockUI('businessTable') blockUIList: NgBlockUI;

  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthenticationService,
    private http: HttpClient,
    private ngZone: NgZone
  ) {}

  /**
   * The Businesses App Main Resolver
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getBusinesses(1, 10)]).then(([files]) => {
        resolve();
      }, reject);
    });
  }

getFilteredBusiness(searchText, view?: string) {
    this.searchText = searchText;
    if (!this.searchText) {
      this.onBusinessChanged.next(this.Businesses);
    }
    if (view === 'table') {
    } else {
      this.getBusinesses(1, 10, this.searchText);
    }
  }

  getNextPageData($event): void {
    if (this.searchText) {
      this.getBusinesses(
        $event.pageIndex + 1,
        $event.pageSize,
        this.searchText
      );
    } else {
      this.getBusinesses($event.pageIndex + 1, $event.pageSize);
    }
  }

  getPagesOnScroll(): void {
    //debugger;
    if (this.Businesses.length < this.paging.length) {
      this.paging.pageIndex = this.paging.pageIndex + 1;
      if (this.searchText) {
        this.getBusinesses(this.paging.pageIndex, 5, this.searchText, true);
      } else {
        this.getBusinesses(this.paging.pageIndex, 5, null, true);
      }
    } else {
      const container = document.getElementById('Businesses');
      this.ngZone.run(() => {
        container.removeEventListener('scroll', () => {
          if (container.scrollTop > 200) {
            this.ngZone.run(() => {
              this.getPagesOnScroll();
            });
          }
        });
      });
    }
  }

  getBusinesses(
    pageNumber: number,
    pageSize: number,
    searchText?: string,
    secondCall?: boolean
  ): Promise<any> {
    this.blockUIList.start();
    const url = searchText
      ? `Business?PageNumber=${pageNumber}&PageSize=${pageSize}&SearchQuery=${searchText}`
      : `Business?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    return new Promise((resolve, reject) => {
      this.apiSvc.get(url, null, true).subscribe((response: any) => {
        // debugger;
        if (secondCall) {
          response.body.forEach(element => {
            this.Businesses.push(element);
          });
        } else {
          this.Businesses = response.body;
        }
        this.onBusinessChanged.next(this.Businesses);
        const pagingHeader = JSON.parse(response.headers.get('X-Pagination'));
        this.paging = {
          length: pagingHeader.totalCount,
          pageSize: pagingHeader.pageSize,
          pageIndex: pagingHeader.currentPage
        };
        // "{"previousPageLink":null,"nextPageLink":null,"totalCount":5,"pageSize":5,"currentPage":1,"totalPages":1}"
        // this.onPagingChanged.next(this.paging);
        this.blockUIList.stop();
        resolve(response.body);
      }, reject);
    });
  }

getBusinessesForTable(
    startValue,
    pageSize,
    sort?:string,
    direction?:string,
    searchText?:string
  ): Observable<any[]> {
    this.blockUIList.start();
    return this.apiSvc
      .get(
        `Business/external?pageSize=${pageSize}&pageNumber=${startValue}&IncludeAll=${true}&SearchQuery=${searchText}&orderBy=${
          sort ? sort : 'name'
        } ${direction ? direction : 'desc'}`,
        null,
        true
      )
      .map(response => {
        this.blockUIList.stop();
        return response;
      });
  }
testgetBusinessesForTable(
    startValue?:number,
    pageSize?:number,
    sort?:string,
    direction?:string,
    searchText?:string
  ): Observable<any[]> {
    this.blockUIList.start();
    return this.apiSvc
      .get(
        `Business/external?pageSize=${pageSize}&pageNumber=${startValue}`
      )
      .map(response => {
        this.blockUIList.stop();
        return response;
      });
  }
}
