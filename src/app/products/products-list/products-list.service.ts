import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Product } from '../single/single.model';

@Injectable()
export class ProductsListService {
  products: any[];
  onProductsChanged: BehaviorSubject<any> = new BehaviorSubject({});
  //rxjs 
  constructor(private apiSvc: ApiService) {}
  getProducts(
    startValue,
    pageSize,
    sort?: string,
    direction?: string
  ): Observable<any[]> {
    return this.apiSvc.get(
      `product?Isproperty=false&pageSize=${pageSize}&pageNumber=${startValue}&orderBy=${
        sort ? sort : 'name asc'
      } ${direction}`,
      null,
      true
    );
  }

  deleteProduct(product: Product): Observable<any> {
    return this.apiSvc.delete(`Product/${product.id}/true`);
  }
  

}
// "asc" | "desc"
