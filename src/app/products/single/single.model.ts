import { MatChipInputEvent } from '@angular/material';
import { FuseUtils } from '@fuse/utils';

export class Product {
  id: number;
  name: string;
  handle: string;
  active: boolean;
  isproperty:boolean;
  description: string;
  quantity: number;
  subGroupId: null;
  colorId: number;
  groupId: null;
  tags: any;
  attachments: {
    attachmentId: string;
    url: number;
  }[];
  categories: any;
  prices: {
    price?: number;
    typeId?: number;
    productUid?: string;
    unitCount?: number;
    taxAmount?: number;
    unitPrice?: number;
    taxIncluded?: number;
    taxRateId?: number;
    packageId?: number;
    memberLevelId?: number;
    buyPrice?: number;
    markupPercent?: number;
    countryId?: number;
  }[];
  productGenerics: {
    value: string;
    key: string;
    keyId: number;
  }[];
  property: {
    name:string;
    statusId: number;
    typeId: number;
    projectId: number;
    bedrooms: string;
    bathrooms: string;
    carSpaces: string;
    locationId: string;
    landSqMeter: string;
    houseSqMeter: string;
    address: {
      suburb: string;
      postcode: string;
      state: string;
      number: string;
      address: string;
      address2: string;
      country: string;
      longitude: number;
      latitude: number;
    };
  };
  sortOrder?: number;
  mainImageId?: number;
  mainImage?: string;
  altImageId?: number;
  altImage?: string;
  thumbImageId?: number;
  thumbImage?: string;
  showOnWebsite?:boolean;
  constructor(product?) {
    product = product || {};
    this.id = product.id;
    this.name = product.name || '';
    this.mainImage = product.mainImage || '';
    this.mainImageId = product.mainImageId || null;
    this.altImage = product.altImage || '';
    this.altImageId = product.altImageId || null;
    this.thumbImage = product.thumbImage || '';
    this.thumbImageId = product.thumbImageId || null;
    this.handle = product.handle || FuseUtils.handleize(this.name);
    this.description = product.description || '';
    this.active = product.active || true;
    this.categories = product.categories || [];
    this.colorId = product.colorId || null;
    this.tags = product.tags || [];
    this.attachments = product.attachments || [];
    this.prices = product.prices || [];
    this.productGenerics = product.productGenerics || [];
    this.property = product.property || {
      statusId: null,
      typeId: null,
      projectId: null,
      bedrooms: '',
      bathrooms: '',
      carSpaces: '',
      locationId: '',
      landSqMeter: '',
      houseSqMeter: '',
      address: {
        suburb: '',
        postcode: '',
        state: '',
        number: '',
        address: '',
        address2: '',
        country: '',
        longitude: 0,
        latitude: 0
      }
    };
    this.groupId = product.groupId || null;
    this.subGroupId = product.subGroupId || null;
    this.showOnWebsite = product.showOnWebsite || false;
  }

  addCategory(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add category
    if (value) {
      this.categories.push({ text: value });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeCategory(category) {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add tag
    if (value) {
      this.tags.push({ text: value });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
