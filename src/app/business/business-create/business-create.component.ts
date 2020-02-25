import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContactModel, IBusinessModel } from '../business.model';
import { BusinessCreateService } from './business-create.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-business-create',
  templateUrl: './business-create.component.html',
  styleUrls: ['./business-create.component.scss'],
  animations: fuseAnimations
})
export class BusinessCreateComponent implements OnInit {
  public imageUrl;
  Business: IBusinessModel;
  pageType: string;
  onBusinessChanged: Subscription;
  @BlockUI('businessCreate') blockUIList: NgBlockUI;
  selectedContact: IContactModel;
  BusinessForm: FormGroup;
  attachment: {
    id: number;
    url: string;
  };
  constructor(
    private BusinessSvc: BusinessCreateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.imageUrl = environment.ImageApiUrl;
  }

  attachmentUpdate(attach): void {
    this.attachment = attach;
  }

addBusiness(BusinessData): void {
  console.log("@contactInfo",BusinessData);
    this.Business = {
      id: this.Business.id ? this.Business.id : undefined,
      addresss: [
        {
          address: BusinessData.address,
          address2: BusinessData.address2,
          country: BusinessData.country,
          latitude: BusinessData.latitude,
          longitude: BusinessData.longitude,
          state: BusinessData.state,
          suburb: BusinessData.suburb,
          postcode: BusinessData.postcode
        }
      ],
      name: BusinessData.name,
      otherName: BusinessData.otherName,
      code: BusinessData.code,
      otherCode: BusinessData.otherCode,
      industryId: BusinessData.industryId,
      tradingId: BusinessData.tradingTerm,
      showOnWebsite: BusinessData.showOnWebsite,
      activeStatus: true,
      dateJoined: new Date().toDateString(),
      logoId: this.attachment ? this.attachment.id : null,
      //contacts: this.Business.contacts
      contacts:[
        {
          tel: BusinessData.tel,
          fax: BusinessData.fax,
          mobile: BusinessData.mobile,
          webSite: BusinessData.webSite,
          firstName: BusinessData.firstName,
          lastName: BusinessData.lastName,
          email: BusinessData.email,
          birthday:BusinessData.birthday,
          showOnWebsite: BusinessData.showOnWebsite,
          imageId: BusinessData.imageId,
          titleId: BusinessData.titleId,
          trustLevelId: BusinessData.trustLevelId
        }
      ]
    };

    if (this.pageType === 'edit') {
      this.saveBusiness();
    } else if (this.pageType === 'new') {
      this.newBusiness();
    }
  }

  newBusiness(): void {
    this.blockUIList.start();
    console.log("business before post",this.Business);
    this.BusinessSvc.addBusiness(this.Business).subscribe(response => {
      if (response) {
        console.log("@Does the response includes the contactInfo",JSON.stringify(response));
        // Show the success message
        this.snackBar.open('Business added', 'OK', {
          verticalPosition: 'bottom',
          duration: 1000,
          panelClass: 'mat-green-bg'
        });
        this.blockUIList.stop();
        this.router.navigate(['business/list']);
      }
    });
  }

  saveBusiness(): void {
    this.blockUIList.start();
    this.BusinessSvc.editBusiness(this.Business).subscribe(response => {

      if (response) {
        // Show the success message
        this.snackBar.open('Business' + this.Business.name + '  Edited', 'OK', {
          verticalPosition: 'top',
          duration: 1000,
          panelClass: 'mat-green-bg'
        });
        this.blockUIList.stop();
        this.router.navigate(['business/list']);
      } else {
        this.snackBar.open(response, 'OK', {
          verticalPosition: 'top',
          duration: 1000,
          panelClass: 'mat-red-bg'
        });
        this.blockUIList.stop();
      }
    });
  }

  ngOnInit() {
    // Subscribe to update product on changes
    console.log("what happen here");
    this.onBusinessChanged = this.BusinessSvc.onBusinessChanged.subscribe(
      Business => {
        if (Business) {
          console.log("edit happen",JSON.stringify(Business));
          this.Business = new IBusinessModel(Business);
          this.selectedContact= Business.contacts;
          console.log("contactAppeared",this.selectedContact);
          this.pageType = 'edit';
          this.attachment = {
            url: Business.logo,
            id: Business.logoId
          };
        } else {
          //
          this.pageType = 'new';
          this.Business = new IBusinessModel();
          this.selectedContact = new IContactModel();
          //shift here this.selectedContact
        }
      }
    );
    this.BusinessForm = this.formBuilder.group({
      name: [this.Business.name, Validators.required],
      otherName: [this.Business.otherName],
      code: [this.Business.code],
      otherCode: [this.Business.otherCode],
      industryId: [this.Business.industryId],
      tradingTerm: [this.Business.tradingId],
      showOnWebsite: [this.Business.showOnWebsite],
      suburb: [this.Business.addresss[0].suburb],
      postcode: [this.Business.addresss[0].postcode, [Validators.maxLength(5)]],
      state: [this.Business.addresss[0].state],
      number: [this.Business.addresss[0].number],
      address: [this.Business.addresss[0].address],
      address2: [this.Business.addresss[0].address2],
      country: [this.Business.addresss[0].country],
      longitude: [this.Business.addresss[0].longitude],
      latitude: [this.Business.addresss[0].latitude],
      email: [this.selectedContact.email],
      firstName: [this.selectedContact.firstName],
      lastName: [this.selectedContact.lastName],
      tel: [this.selectedContact.tel],
      fax: [this.selectedContact.fax],
      mobile: [this.selectedContact.mobile],
      webSite: [this.selectedContact.webSite],
      birthday: [this.selectedContact.birthday],
      showContactOnWebsite: [this.selectedContact.showOnWebsite],
      imageId: [this.selectedContact.imageId],
      titleId: [this.selectedContact.titleId],
      // storeId: ['', Validators.required],
      trustLevelId: [this.selectedContact.trustLevelId]
    });
  }
}
