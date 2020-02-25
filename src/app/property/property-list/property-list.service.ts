import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../products/single/single.model';
import { HttpResponse } from '@angular/common/http';
//import { Product } from '../single/single.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyListService {
  products: any[];
  onProductsChanged:BehaviorSubject<any> = new BehaviorSubject({});
  constructor(private apiSvc: ApiService) {}
  getProducts(
    startValue,
    pageSize,
    sort?:string,
    direction?: string
  ): Observable<any[]> {
    return this.apiSvc.get(
      `product?Isproperty=true&pageSize=${pageSize}&pageNumber=${startValue}&orderBy=${
        sort ? sort : 'name asc'
      } ${direction}`,
      null,
      true
    );
  }

  getProjectsListDrp(): Observable<any[]> {
    return this.apiSvc
      .get(
        `Project/selectList`,
        null,
        true
      );
  }


  deleteProduct(product: Product): Observable<any> {
    return this.apiSvc.delete(`Product/${product.id}/true`);
  }

}
