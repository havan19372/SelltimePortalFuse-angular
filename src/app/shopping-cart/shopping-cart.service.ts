import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCarts: any[];
  onShoppingCartsChanged: BehaviorSubject<any> = new BehaviorSubject({});
  constructor(private apiSvc: ApiService) {}

 
  getShoppingCartsForTable(
    startValue,
    pageSize,
    sort?: string,
    direction?: string,
    searchText?: string
  ): Observable<any[]> {
    return this.apiSvc
      .get(
        `shoppingCart?pageSize=${pageSize}&pageNumber=${startValue}${searchText ? '&SearchQuery='+ searchText : '&' }orderBy=${
          sort ? sort : 'id desc'
        } ${direction ? direction : 'desc'}`,
        null,
        true
      )
      .map(response => {
        this.shoppingCarts=response.body;
        return response;
      });
  }
  deleteShoppingCart(id: number): Observable<any> {
    return this.apiSvc.delete(`shoppingCart/${id}/true`);
  }
  getShoppingCartDetails(id: number): Observable<any> {
    return this.apiSvc.get(`shoppingCart/${id}`);
  }

}
