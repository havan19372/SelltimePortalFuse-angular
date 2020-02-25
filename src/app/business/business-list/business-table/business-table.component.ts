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
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BusinessListService } from '../business-list.service';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-business-table',
  templateUrl: './business-table.component.html',
  styleUrls: ['./business-table.component.scss'],
  animations: fuseAnimations
})
export class BusinessTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() filter: any;
  @Output() callNewBusiness: EventEmitter<any> = new EventEmitter();
  displayedColumns = ['image', 'name', 'contact','email','tel', 'address','options','showOnWebsite'];
  dataSource = new MatTableDataSource();
  imageUrl: string;
  businessLength: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startValue=10;
  constructor(
    private router: Router,
    private BusinessService: BusinessListService
  ) {
    this.imageUrl = environment.ImageApiUrl;
  }

newBusiness(BusinessId?:string){
    this.callNewBusiness.emit(BusinessId);
  }

  ngOnInit() {
    this.getBusinessDataOnScroll();
    //debugger
    /*this.sort.sortChange.subscribe(() =>(this.paginator.pageIndex = 0));
    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.filter.valueChanges.debounceTime(300).distinctUntilChanged()
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.BusinessService.getBusinessesForTable(
            this.paginator.pageIndex + 1,
            10,
            this.sort.active,
            this.sort.direction,
            this.filter.value
          );
        }),
        map((response: any) => {
          const pagingHeader = JSON.parse(response.headers.get('X-Pagination'));
          const paging = {
            length: pagingHeader.totalCount,
            pageSize: pagingHeader.pageSize,
            pageIndex: pagingHeader.currentPage - 1
          };
          this.businessLength = pagingHeader.totalCount;
          return response;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.dataSource.data = data.body;
        console.log("@find",this.dataSource.data);
      });*/
  }

  getBusinessDataOnScroll(){
    let pageSize=10;
    this.BusinessService.testgetBusinessesForTable(pageSize,this.startValue).subscribe(res=>{
      console.log("@availableData",res);
      this.dataSource.data = res;
    })
  }
  onScroll()
  {
    console.log("Scrolled");
    this.startValue = this.startValue + 1;
    this.getBusinessDataOnScroll();
  }
  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
}
