import * as _ from 'lodash';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
//import { ProductsListService } from './products-list.service';
import { fuseAnimations } from '@fuse/animations';
import { environment } from '../../../environments/environment';
//import { Product } from '../single/single.model';
import { SweetAlertService } from '../../core/services/sweet-alert.service';
import { ProductsListService } from '../../products/products-list/products-list.service';
import { Product } from '../../products/single/single.model';
import { ApiService } from 'app/core/services/api.service';
import { PropertyListService } from './property-list.service';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
  animations: fuseAnimations
})
export class PropertyListComponent implements OnInit {

  displayedColumns = [
    // 'id',
    'image',
    'name',
    // 'quantity',
    // 'active',
    // 'description',
    'showOnWebsite',
    'group',
    'subGroup',
    'property.houseSqMeter',
    'property.bathrooms',
    'prices',
    'categories',
    'options'
  ];
  // exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();
  imageUrl: string;
  productsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  constructor(
    private productsSvc: PropertyListService,
    private sweetAlert: SweetAlertService,
    private apiService:ApiService
  ) {
    this.imageUrl = environment.ImageApiUrl;
  }

  deleteProduct(product: Product): void {
    this.sweetAlert.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.productsSvc.deleteProduct(product).subscribe(response => {
            this.sweetAlert.showSuccess(
              'Deleted Successfully',
              `Product ${product.name} deleted !`
            );
            const data = this.dataSource.data;
            _.remove(data, (elem: Product) => {
              return elem.id === product.id;
            });
            debugger;
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
          });
        }
      }
    );
  }
  ngOnInit() {
    this.productsSvc.onProductsChanged.subscribe(res=>{
      console.log("Product Recieved at Property List",res.body);
    })
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.productsSvc.getProducts(
            this.paginator.pageIndex + 1,
            10,
            this.sort.active,
            this.sort.direction
          );
        }),
        map((response: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          const pagingHeader = JSON.parse(response.headers.get('X-Pagination'));
          const paging = {
            length: pagingHeader.totalCount,
            pageSize: pagingHeader.pageSize,
            pageIndex: pagingHeader.currentPage - 1
          };
          this.productsLength = pagingHeader.totalCount;

          return response;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          return observableOf([]);
        })
      )
      .subscribe(data => {
        console.log("returned@",data.body);
        this.dataSource.data = data.body;
      });
  }
  
}
