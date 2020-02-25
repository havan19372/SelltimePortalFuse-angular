import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../single.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LookUpService } from '../../../core/services/look-up.service';
import { LookUpCodes, LookUpModel } from '../../../core/lookUpCodes';

@Component({
  selector: 'app-main-product-tab',
  templateUrl: './main-product-tab.component.html',
  styleUrls: ['./main-product-tab.component.scss']
})
export class MainProductTabComponent implements OnInit {

  @Input() product: Product;

  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  productMainForm: FormGroup;
  groups: LookUpModel[]
  subGroups: LookUpModel[];
  colours: LookUpModel[];

  constructor(private lookUpSvc: LookUpService, private fb: FormBuilder) {}

  fillLookUp(): void {
    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.productGroupCode)
      .subscribe((response: LookUpModel[]) => {
        this.groups = response;
      });

    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.productSubGroupCode)
      .subscribe((response: LookUpModel[]) => {
        //
        this.subGroups = response;
      });

    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.productColoursCode)
      .subscribe((response: LookUpModel[]) => {
        //
        this.colours = response;
      });
  }

  ngOnInit() {
    this.fillLookUp();
    this.productMainForm = this.fb.group({
      id: [this.product.id],
      name: [this.product.name],
      groupId: [this.product.groupId],
      colorId: [this.product.colorId],
      subGroupId: [this.product.subGroupId],
      description: [this.product.description],
      categories: [this.product.categories],
      tags: [this.product.tags],
      showOnWebsite:[this.product.showOnWebsite]
    });

    this.formReady.emit(this.productMainForm);
  }

}
