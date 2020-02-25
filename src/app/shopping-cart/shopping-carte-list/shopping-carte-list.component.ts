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
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { SweetAlertService } from '../../core/services/sweet-alert.service';
import { environment } from 'environments/environment';
import { ShopingCartModel } from '../shoppingCart.model';
import { AddressDetailsComponent } from '../address-details/address-details.component';

@Component({
  selector: 'app-shopping-carte-list',
  templateUrl: './shopping-carte-list.component.html',
  styleUrls: ['./shopping-carte-list.component.scss'],
  animations: fuseAnimations

})
export class ShoppingCarteListComponent implements OnInit {
  @Input() filter: any;
  @Output() callNewProject: EventEmitter<any> = new EventEmitter();

  displayedColumns = ['id','cardNumber', 'fromDate', 'toDate', 'paymentTotal','options'];
  dataSource = new MatTableDataSource();
  imageUrl: string;
  dialogRef: any;

  shopCartsLength: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoadingResults: boolean=false;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private sweetAlert: SweetAlertService,
    private dialog: MatDialog,

  ) {
    this.imageUrl = environment.ImageApiUrl;
  }





  deleteProject(shoppingCart: ShopingCartModel): void {
    this.sweetAlert.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.shoppingCartService.deleteShoppingCart(shoppingCart.id).subscribe(response => {
            this.sweetAlert.showSuccess(
              'Deleted Successfully',
              `Shopping Cart ${shoppingCart.cardNumber} deleted !`
            );
            const data = this.dataSource.data;
            _.remove(data, (elem: ShopingCartModel) => {
              return elem.id === shoppingCart.id;
            });
            debugger;
            console.log('here', data, this.paginator);
            this.dataSource.data = data;
            this.init();
            //this.dataSource.paginator = this.paginator;
          });
        }
      }
    );
  }

  init() {
    merge(
      this.sort.sortChange,
      this.paginator.page,
      // this.filter.valueChanges.debounceTime(300).distinctUntilChanged()
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults=true;
          return this.shoppingCartService.getShoppingCartsForTable(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize ? this.paginator.pageSize : 50,
            this.sort.active ? this.sort.active : 'id',
            this.sort.direction ? this.sort.direction : 'desc',
            null//  this.filter.value
          );
        }),
        map((response: any) => {
           const pagingHeader = JSON.parse(response.headers.get('X-Pagination'));
          const paging = {
            length: pagingHeader.totalCount,
            pageSize: pagingHeader.pageSize,
            pageIndex: pagingHeader.currentPage - 1
          };
          this.shopCartsLength = pagingHeader.totalCount;
          return response;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.isLoadingResults=false;
        this.dataSource.data = data.body;
      });
  }
  ngOnInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.init();
  }

  showShopCarteDetatails(id:number){
    alert(id);
  }
  showShopCarteAddress(address:any){
    this.dialogRef =    this.dialog.open(AddressDetailsComponent, {
      width: '600px',
      data: {
        address: address
      }
    });
  }
  showShopCarteContact(contact:any){
    alert(contact);
  }
}
