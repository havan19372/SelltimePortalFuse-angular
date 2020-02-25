import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';
import { EcommerceProductService } from './single.service';

import * as _ from 'lodash';

import { fuseAnimations } from '@fuse/animations';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './single.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';
import { UploadService } from '../../core/services/upload.service';
import { MapsAPILoader } from '@agm/core';
import { LookUpCodes, LookUpModel } from '../../core/lookUpCodes';
import { LookUpService } from '../../core/services/look-up.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'fuse-e-commerce-product',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class FuseEcommerceProductComponent implements OnInit, OnDestroy {
  public ImageUrl = environment.ImageApiUrl;
  product = new Product();
  onProductChanged: Subscription;
  pageType: string;
  productForm: FormGroup;
  productProjects: LookUpModel[];
  ProductCategories: LookUpModel[];

  @BlockUI('productCreate') blockUIList: NgBlockUI;


  searchControl: FormControl;

  constructor(
    private productService: EcommerceProductService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private location: Location,
    private lookUpSvc: LookUpService,
    private cdr: ChangeDetectorRef
  ) {}


  @ViewChild('search') public searchElementRef: ElementRef;

  /**
   * @description On Init Method
   */
  ngOnInit() {
    this.fillLookUpData();

    // Subscribe to update product on changes
    this.onProductChanged = this.productService.onProductChanged.subscribe(
      product => {
        if (product) {
          this.product = new Product(product);
          this.pageType = 'edit';
        } else {
          this.pageType = 'new';
          this.product = new Product();
        }

        this.productForm = this.createProductForm();
      }
    );
  }

  formInitialized(name: string, form: FormGroup) {
    console.log("getting data from childComponent",name,form);
    this.productForm.setControl(name,form);
    this.cdr.detectChanges();
  }

  /**
   * @description Collect Product Data
   */
  CollectProductData() {
    debugger;
    this.product.name = this.productForm.get('mainProduct').get('name').value;
    this.product.description = this.productForm.get('mainProduct').get('description').value;
    this.product.groupId = this.productForm.get('mainProduct').get('groupId').value;
    this.product.colorId = this.productForm.get('mainProduct').get('colorId').value;
    this.product.subGroupId = this.productForm.get('mainProduct').get('subGroupId').value;
    this.product.active = this.productForm.get('active').value;
    this.product.showOnWebsite = this.productForm.get('mainProduct').get('showOnWebsite').value;
    this.product.isproperty=false;
  }

  fillLookUpData(): void {
    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.ProductCategpry)
      .subscribe((response: LookUpModel[]) => {
        //
        this.ProductCategories = response;
      });
  }

  createProductForm() {
    return this.formBuilder.group({
      handle: [this.product.handle],
      prices: [this.product.prices],
      genericId: null,
      genericValue: [],
      active: [this.product.active],
    });
  }

  saveProduct() {
    this.blockUIList.start();
    this.CollectProductData();
    console.log("working state of the product",this.product);
    console.log(JSON.stringify(this.product));
    this.productService.saveProduct(this.product).then(() => {
      // Trigger the subscription with new data
      // this.productService.onProductChanged.next(data);

      // Show the success message
      this.snackBar.open('Product saved', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
      this.location.back();
      // Change the location with new one
    });
    this.blockUIList.stop();
  }

  addProduct() {
    this.blockUIList.start();
    debugger;
    this.CollectProductData();
    console.log(JSON.stringify(this.product));
    console.log("State of the product-object",this.product);
    this.productService.addProduct(this.product).then(() => {
      debugger;
      // Trigger the subscription with new data
      this.productService.onProductChanged.next(this.product);
      // Show the success message
      this.snackBar.open('Product added', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });

      this.blockUIList.stop();

      this.location.back();

      // Change the location with new one
      // this.location.go('product/' + this.product.id + '/' + true);
    });
  }



  ngOnDestroy() {
    this.onProductChanged.unsubscribe();
  }

  addPrice() {
    const price = this.productForm.get('prices').value;
    if (price) {
      this.product.prices.push({ price: price });
    }
  }
  removePrice(price: any) {
    const index = this.product.prices.indexOf(price);
    if (index >= 0) {
      this.product.prices.splice(index, 1);
    }
  }

  addGenericItem() {
    const generic = {
      key: '',
      keyId: this.productForm.get('genericId').value,
      value: this.productForm.get('genericValue').value
    };
    if (generic && generic.value != null && generic.keyId != null) {
      const genericKeyText: string = this.ProductCategories.find(
        s => s.value === generic.keyId
      ).text;
      generic.key = genericKeyText;
      this.product.productGenerics.push(generic);
    }
  }
  removeGenericItem(item: any) {
    const index = this.product.productGenerics.indexOf(item);
    if (index >= 0) {
      this.product.productGenerics.splice(index, 1);
    }
  }

}
