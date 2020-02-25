import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
//import { Product } from '../single.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LookUpService } from '../../../core/services/look-up.service';
import { LookUpCodes, LookUpModel } from '../../../core/lookUpCodes';
import { MapsAPILoader } from '@agm/core';
import { Product } from '../../../products/single/single.model';
@Component({
  selector: 'app-main-property-tab',
  templateUrl: './main-property-tab.component.html',
  styleUrls: ['./main-property-tab.component.scss']
})
export class MainPropertyTabComponent implements OnInit {

  @Input() product: Product;
  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  productPropertyForm: FormGroup;

  productStatuses: LookUpModel[];
  productTypes: LookUpModel[];
  groups: LookUpModel[]
  subGroups: LookUpModel[];
  @Input() projectsListDrp: any;

  autoCompleteAdd1: google.maps.places.Autocomplete;
  autoCompleteAdd2: google.maps.places.Autocomplete;
  @ViewChild('autocomplete1') autocomplete1: ElementRef;
  @ViewChild('autocomplete2') autocomplete2: ElementRef;

  constructor(
    private lookUpSvc: LookUpService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder
  ) {}

  fillLookUp(): void {
    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.productStatusCode)
      .subscribe((response: LookUpModel[]) => {
        //
        this.productStatuses = response;
      });

    this.lookUpSvc
      .getLookUpDetails(LookUpCodes.productTypeCode)
      .subscribe((response: LookUpModel[]) => {
        //
        this.productTypes = response;
      });
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
          this.productPropertyForm
            .get('latitude')
            .setValue(place.geometry.location.lat().toString());
          this.productPropertyForm
            .get('longitude')
            .setValue(place.geometry.location.lng().toString());
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
        this.productPropertyForm
          .get('suburb')
          .setValue(address[i][componentForm[addressType]]);
      } else if (addressType === 'administrative_area_level_1') {
        this.productPropertyForm
          .get('state')
          .setValue(address[i][componentForm[addressType]]);
      } else if (addressType === 'postal_code') {
        this.productPropertyForm
          .get('postcode')
          .setValue(address[i][componentForm[addressType]]);
      } else if (addressType === 'country') {
        this.productPropertyForm
          .get('country')
          .setValue(address[i][componentForm[addressType]]);
      }
    }
    if (inputAddress === 1) {
      this.productPropertyForm
        .get('address')
        .setValue(street_number + ' ' + route);
    } else if (inputAddress === 2) {
      this.productPropertyForm
        .get('address2')
        .setValue(street_number + ' ' + route);
    }
  }


  ngOnInit() {
    this.fillLookUp();
    this.initAutocomplete();
    this.productPropertyForm = this.fb.group({
      name:[this.product.name],
      description: [this.product.description],
      isproperty: [this.product.isproperty],
      property: [this.product.property],
      projectId: [this.product.property.projectId],
      bathrooms: [this.product.property.bathrooms],
      bedrooms: [this.product.property.bedrooms],
      carSpaces: [this.product.property.carSpaces],
      statusId: [this.product.property.statusId],
      typeId: [this.product.property.typeId],
      houseSqMeter: [this.product.property.houseSqMeter],
      landSqMeter: [this.product.property.landSqMeter],
      suburb: [this.product.property.address.suburb],
      postcode: [this.product.property.address.postcode],
      state: [this.product.property.address.state],
      number: [this.product.property.address.number],
      address: [this.product.property.address.address],
      address2: [this.product.property.address.address2],
      country: [this.product.property.address.country],
      longitude: [this.product.property.address.longitude],
      latitude: [this.product.property.address.latitude],
      showOnWebsite:[this.product.showOnWebsite],
      groupId: [this.product.groupId],
      subGroupId: [this.product.subGroupId],
    });
    this.formReady.emit(this.productPropertyForm);
  }
}
