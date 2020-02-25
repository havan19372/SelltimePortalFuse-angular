import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ApiService } from "../../core/services/api.service";

@Injectable()
export class EcommerceProductService implements Resolve<any> {
  routeParams: any;
  product: any;
  onProductChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private apiSvc: ApiService) {}

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {
      Promise.all([this.getProduct()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getProduct(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === "new") {
        this.onProductChanged.next(false);
        resolve(false);
      } else {
        this.apiSvc
          .get("product/" + this.routeParams.id + "/" + true)
          .subscribe((response: any) => {
            debugger;
            this.product = response;
            this.onProductChanged.next(this.product);
            resolve(response);
          }, reject);
      }
    });
  }

  saveProduct(product) {
    console.log("state of product without untouch", product);
    return new Promise((resolve, reject) => {
      this.apiSvc
        .put("product/" + product.id, product)
        .subscribe((response: any) => {
          if (response.error) {
            // tslint:disable-next-line:no-debugger
          } else {
            resolve(response);
          }
        }, reject);
    });
  }

  addProduct(product) {
    return new Promise((resolve, reject) => {
      delete product["id"];
      this.apiSvc.post("product", product).subscribe((response: any) => {
        if (response.error) {
          // tslint:disable-next-line:no-debugger
        } else {
          resolve(response);
        }
      }, reject);
    });
  }

  getProjectsListDrp(): Observable<any[]> {
    return this.apiSvc.get(`Project/selectList`, null, true);
  }
}
