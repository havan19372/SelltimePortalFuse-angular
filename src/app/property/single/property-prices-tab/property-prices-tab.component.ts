import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LookUpService } from '../../../core/services/look-up.service';
import { LookUpCodes, LookUpModel } from '../../../core/lookUpCodes';
import { Product } from '../../../products/single/single.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-property-prices-tab',
  templateUrl: './property-prices-tab.component.html',
  styleUrls: ['./property-prices-tab.component.scss']
})
export class PropertyPricesTabComponent implements OnInit {
  @Input() product: Product;
  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  productPricesForm: FormGroup;

  priceTypes: LookUpModel[];
  taxRates: LookUpModel[];
  pricePackages: LookUpModel[];
  memberLevels: LookUpModel[];
  Countries: LookUpModel[];

  constructor(private fb: FormBuilder, private lookUpSvc: LookUpService) {}

  addPrice(): void {
    debugger;
    console.log('this.productPricesForm.getRawValue(): ', this.productPricesForm.getRawValue());
    this.product.prices.push(this.productPricesForm.getRawValue());
  }

  editPrice(price: any): void {
    this.productPricesForm.get('price').setValue(price.price);
    this.productPricesForm.get('priceTypeId').setValue(price.typeId);
    this.productPricesForm.get('productUid').setValue(price.productUid);
    this.productPricesForm.get('unitCount').setValue(price.unitCount);
    this.productPricesForm.get('taxAmount').setValue(price.taxAmount);
    this.productPricesForm.get('unitPrice').setValue(price.unitPrice);
    this.productPricesForm.get('taxIncluded').setValue(price.taxIncluded);
    this.productPricesForm.get('taxRateId').setValue(price.taxRateId);
    this.productPricesForm.get('packageId').setValue(price.packageId);
    this.productPricesForm.get('memberLevelId').setValue(price.memberLevelId);
    this.productPricesForm.get('buyPrice').setValue(price.buyPrice);
    this.productPricesForm.get('markupPercent').setValue(price.markupPercent);
    this.productPricesForm.get('countryId').setValue(price.countryId);

    this.deletePrice(price);
  }

  deletePrice(price: any): void {
    _.remove(this.product.prices, elem => {
      return elem.productUid === price.productUid;
    });
  }

  fllDropDown(): void {
    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.PriceType)
      .subscribe((response: LookUpModel[]) => {
        //
        this.priceTypes = response;
      });

    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.PriceTax)
      .subscribe((response: LookUpModel[]) => {
        //
        this.taxRates = response;
      });

    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.pricePackages)
      .subscribe((response: LookUpModel[]) => {
        //
        this.pricePackages = response;
      });

    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.memberLevels)
      .subscribe((response: LookUpModel[]) => {
        //
        this.memberLevels = response;
      });

    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.Countries)
      .subscribe((response: LookUpModel[]) => {
        //
        this.Countries = response;
      });
  }

  ngOnInit() {
    this.fllDropDown();

    this.productPricesForm = this.fb.group({
      price: [null],
      priceTypeId: [null],
      productUid: [null],
      unitCount: [null],
      taxAmount: [null],
      unitPrice: [null],
      taxIncluded: [null],
      taxRateId: [null],
      packageId: [null],
      memberLevelId: [null],
      buyPrice: [null],
      markupPercent: [null],
      countryId: [null]
    });
  }
}
