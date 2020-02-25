import * as _ from 'lodash';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  Inject,
  ElementRef,
  NgZone
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { LookUpService } from '../../../core/services/look-up.service';
import { LookUpModel, LookUpCodes } from '../../../core/lookUpCodes';
import { confirmPassword } from '../../../auth/confirmPassword.validator';
import { UploadService } from '../../../core/services/upload.service';
import { MapsAPILoader } from '@agm/core';
import { IContactModel, IBusinessModel } from '../../business.model';
import { BusinessCreateService } from '../business-create.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-business-create-form',
  templateUrl: './business-create-form.component.html',
  styleUrls: ['./business-create-form.component.scss']
})
export class BusinessCreateFormComponent implements OnInit {
  step = 0;
  @Input() imageUrl: string;
  @Input() Business: IBusinessModel;
  @Input() pageType: string;
  @Output() onAddBusiness = new EventEmitter();
  @Input() BusinessForm: FormGroup;
  @BlockUI('businessCreate') blockUIList: NgBlockUI;

  autoCompleteAdd1: google.maps.places.Autocomplete;
  autoCompleteAdd2: google.maps.places.Autocomplete;
  @ViewChild('autocomplete1') autocomplete1: ElementRef;
  @ViewChild('autocomplete2') autocomplete2: ElementRef;

  @Output() onAttachmentUpdate = new EventEmitter();

  attachment: any = { id: 0, url: '' };
  industries: LookUpModel[];
  trades: LookUpModel[];
  titles: LookUpModel[];
  trustLevels: LookUpModel[];
  @ViewChild('fileInput') fileInput;
  viewInEditMode:boolean=false;
  panelOpenState = false;
  jsonData:any;
  constructor(
    private formBuilder: FormBuilder,
    private lookUpSvc: LookUpService,
    private uploadService: UploadService,
    private BusinessSvc: BusinessCreateService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  fillLookUpData(): void {
    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.industryCode)
      .subscribe((response: LookUpModel[]) => {
        this.industries = response;
      });

    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.tradingCode)
      .subscribe((response: LookUpModel[]) => {
        this.trades = response;
      });

    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.titlesCode)
      .subscribe((response: LookUpModel[]) => {
        this.titles = response;
      });

    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.trustLevelCode)
      .subscribe((response: LookUpModel[]) => {
        this.trustLevels = response;
      });
  }

  onChange(event: any) {
    this.blockUIList.start(); // Start blocking element only
    //
    const files: File[] = event.target.files;
    if (files) {
      const fileToUpload = files;
      this.uploadService.uploadMultiFiles(fileToUpload).subscribe(res => {
        this.onAttachmentUpdate.emit(res[0]);
        this.attachment = res[0];
        this.blockUIList.stop(); // Stop blocking
      });
    }
  }

  initAutocomplete(): void {
    this.mapsAPILoader.load().then(() => {
      const pos: any = {
        lat: 25.2744,
        lng: 25.2744
      };
      //
      const circle = new google.maps.Circle({
        center: pos,
        radius: 42
      });
      this.autoCompleteAdd1 = new google.maps.places.Autocomplete(
        this.autocomplete1.nativeElement,
        { types: ['geocode'] }
      );
      /* this.autoCompleteAdd2 = new google.maps.places.Autocomplete(
        this.autocomplete2.nativeElement,
        { types: ['geocode'], componentRestrictions: { country: 'au' } }
      ); */
      
      this.autoCompleteAdd1.setBounds(circle.getBounds());
      this.autoCompleteAdd1.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = this.autoCompleteAdd1.getPlace();
          this.fillReceiverDetails(place.address_components, 1);
        });
      });

      /* this.autoCompleteAdd2.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = this.autoCompleteAdd2.getPlace();
          this.fillReceiverDetails(place.address_components, 2);
        });
      }); */
    });
  }

  clearImage(): void {
    this.attachment = {};
  }

  fillReceiverDetails(
    address: google.maps.GeocoderAddressComponent[],
    inputAddress: number
  ): void {
    const componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };
    let street_number, route;
    for (let i = 0; i < address.length; i++) {
      const addressType = address[i].types[0];
      if (addressType === 'street_number') {
        street_number = address[i][componentForm[addressType]];
      }
      if (addressType === 'route') {
        route = address[i][componentForm[addressType]];
      }
      if (addressType === 'locality') {
        this.BusinessForm.get('suburb').setValue(
          address[i][componentForm[addressType]]
        );
      } else if (addressType === 'administrative_area_level_1') {
        this.BusinessForm.get('state').setValue(
          address[i][componentForm[addressType]]
        );
      } else if (addressType === 'postal_code') {
        this.BusinessForm.get('postcode').setValue(
          address[i][componentForm[addressType]]
        );
      } else if (addressType === 'country') {
        this.BusinessForm.get('country').setValue(
          address[i][componentForm[addressType]]
        );
      }
    }
    if (inputAddress === 1) {
      this.BusinessForm.get('address').setValue(street_number + ' ' + route);
    } else if (inputAddress === 2) {
      this.BusinessForm.get('address2').setValue(street_number + ' ' + route);
    }
  }

  addContact(): void {
    this.Business.contacts.push({
      email: this.BusinessForm.get('email').value,
      firstName: this.BusinessForm.get('firstName').value,
      lastName: this.BusinessForm.get('lastName').value,
      tel: this.BusinessForm.get('tel').value,
      mobile: this.BusinessForm.get('mobile').value,
      titleId: this.BusinessForm.get('titleId').value,
      trustLevelId: this.BusinessForm.get('trustLevelId').value,
      webSite: this.BusinessForm.get('webSite').value,
      birthday: this.BusinessForm.get('birthday').value,
      fax: this.BusinessForm.get('fax').value,
      showOnWebsite: this.BusinessForm.get('showContactOnWebsite').value
    });
    this.BusinessForm.get('email').setValue("");
    this.BusinessForm.get('firstName').setValue("");
    this.BusinessForm.get('lastName').setValue('');
    this.BusinessForm.get('tel').setValue('');
    this.BusinessForm.get('mobile').setValue('');
    this.BusinessForm.get('titleId').setValue('');
    this.BusinessForm.get('trustLevelId').setValue('');
    this.BusinessForm.get('webSite').setValue('');
    this.BusinessForm.get('birthday').setValue('');
    this.BusinessForm.get('fax').setValue('');
    this.BusinessForm.get('showContactOnWebsite').setValue(
      false
    );
  }

  //comment for ruuning the app
  
  editContact(contact: IContactModel): void {
    this.BusinessForm.get('email').setValue(contact.email);
    this.BusinessForm.get('firstName').setValue(contact.firstName);
    this.BusinessForm.get('lastName').setValue(contact.lastName);
    this.BusinessForm.get('tel').setValue(contact.tel);
    this.BusinessForm.get('mobile').setValue(contact.mobile);
    this.BusinessForm.get('titleId').setValue(contact.titleId);
    this.BusinessForm.get('trustLevelId').setValue(contact.trustLevelId);
    this.BusinessForm.get('webSite').setValue(contact.webSite);
    this.BusinessForm.get('birthday').setValue(contact.birthday);
    this.BusinessForm.get('fax').setValue(contact.fax);
    this.BusinessForm.get('showContactOnWebsite').setValue(
      contact.showOnWebsite
    );
    this.deleteContact(contact);
  }

  deleteContact(contact: IContactModel): void {
    this.Business.contacts.splice(this.Business.contacts.indexOf(contact));
  }

  ngOnInit() {
    this.fillLookUpData();
    console.log("onLastComponent",this.Business);
    if(this.pageType==="edit"){
      this.viewInEditMode=true;
      this.jsonData=this.Business;
    }
    if (this.Business.logo) {
      this.attachment = {
        url: this.Business.logo,
        id: this.Business.logoId
      };
    }

    this.initAutocomplete();
  }
}
