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
//import { EcommerceProductService } from './single.service';

import * as _ from 'lodash';

import { fuseAnimations } from '@fuse/animations';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
//import { Product } from './single.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';
import { UploadService } from '../../core/services/upload.service';
import { MapsAPILoader } from '@agm/core';
import { LookUpCodes, LookUpModel } from '../../core/lookUpCodes';
import { LookUpService } from '../../core/services/look-up.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Product } from '../../products/single/single.model';
import { EcommerceProductService } from '../../products/single/single.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';
import { PropertyListService } from '../property-list/property-list.service';
@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SingleComponent implements OnInit {

  public ImageUrl = environment.ImageApiUrl;
  product = new Product();
  onProductChanged: Subscription;
  pageType: string;
  productForm: FormGroup;
  productProjects: LookUpModel[];
  ProductCategories: LookUpModel[];

  propertyList: any;

  projectsListDrp$: any;

  @BlockUI('productCreate') blockUIList: NgBlockUI;


  searchControl: FormControl;

  constructor(
    private productService: EcommerceProductService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private location: Location,
    private propService: PropertyListService,
    private lookUpSvc: LookUpService,
    private cdr: ChangeDetectorRef
  ) { }


  @ViewChild('search') public searchElementRef: ElementRef;

  /**
   * @description On Init Method
   */
  ngOnInit() {
    this.fillLookUpData();

    this.propService.getProjectsListDrp().subscribe((data: any) => {
      debugger;
      this.projectsListDrp$ = data.body;
    });
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
    console.log("Received event @", name, form);
    this.productForm.setControl(name, form);
    this.cdr.detectChanges();
  }

  /**
   * @description Collect Product Data
   */
  CollectProductData() {
    debugger;
    //this.product.name = this.productForm.get('productProperty').get('name').value;
    this.product.isproperty = true;
    this.product.showOnWebsite =  this.productForm.get('productProperty').get('showOnWebsite').value;
    this.product.name =  this.productForm.get('productProperty').get('name').value;
    this.product.description =  this.productForm.get('productProperty').get('description').value;
    this.product.groupId =  this.productForm.get('productProperty').get('groupId').value;
    this.product.subGroupId =  this.productForm.get('productProperty').get('subGroupId').value;
    this.product.property.bathrooms = this.productForm.get('productProperty').get('bathrooms').value;
    this.product.property.bedrooms = this.productForm.get('productProperty').get('bedrooms').value;
    this.product.property.carSpaces = this.productForm.get('productProperty').get('carSpaces').value;
    this.product.property.typeId = this.productForm.get('productProperty').get('typeId').value;
    this.product.property.statusId = this.productForm.get('productProperty').get('statusId').value;
    this.product.property.houseSqMeter = this.productForm.get('productProperty').get(
      'houseSqMeter'
    ).value;
    this.product.property.landSqMeter = this.productForm.get('productProperty').get(
      'landSqMeter'
    ).value;
    this.product.property.projectId = this.productForm.get('productProperty').get('projectId').value;
    this.product.property.address = {
      address: this.productForm.get('productProperty').get('address').value,
      suburb: this.productForm.get('productProperty').get('suburb').value,
      postcode: this.productForm.get('productProperty').get('postcode').value,
      state: this.productForm.get('productProperty').get('state').value,
      number: this.productForm.get('productProperty').get('number').value,
      address2: this.productForm.get('productProperty').get('address2').value,
      country: this.productForm.get('productProperty').get('country').value,
      longitude: this.productForm.get('productProperty').get('longitude').value,
      latitude: this.productForm.get('productProperty').get('latitude').value
    };
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
    console.log(JSON.stringify(this.product));
    this.productService.saveProduct(this.product).then(() => {
      // Trigger the subscription with new data
      // this.productService.onProductChanged.next(data);
      // Show the success message
      this.snackBar.open('Property saved', 'OK', {
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
    console.log("Isproperty set to true", this.product.isproperty);
    this.productService.addProduct(this.product).then(() => {
      debugger;
      // Trigger the subscription with new data
      this.productService.onProductChanged.next(this.product);
      // Show the success message
      this.snackBar.open('Property added', 'OK', {
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
