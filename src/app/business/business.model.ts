
export class IBusinessModel {
  id?: number;
  name?: string;
  otherName?: string;
  host?: string;
  dateJoined?: string;
  code?: string;
  taxCode?: string;
  otherCode?: string;
  showOnWebsite?: boolean;
  autoSendEmail?: boolean;
  activeStatus?: boolean;
  industryId?: number;
  tradingId?: number;
  logo?: string;
  logoUrl?:string;
  logoId?: number;
  apiId?: number;
  addresss?: IAddressModel[];
  contacts?: IContactModel[];
  attachment?: {
    id: number;
    url: string;
  };
////revert after
  constructor(Business?:IBusinessModel) {
    if (!Business) {
      Business = {};
      Business.addresss = [new IAddressModel()];
    }
    this.activeStatus = Business.activeStatus || true;
    this.addresss = Business.addresss[0]
      ? Business.addresss
      : [ ];
    this.autoSendEmail = Business.autoSendEmail || false;
    this.code = Business.code || '';
    this.contacts = Business.contacts ? Business.contacts : [];
    this.dateJoined = Business.dateJoined || new Date().toDateString();
    this.host = Business.host || '';
    this.id = Business.id || undefined;
    this.industryId = Business.industryId || undefined;
    this.logoId = Business.logoId || undefined;
    //this.logo = Business.logo || undefined;
    this.logo=Business.logoUrl || undefined;
    this.name = Business.name || '';
    this.otherCode = Business.otherCode || '';
    this.otherName = Business.otherName || '';
    this.showOnWebsite = Business.showOnWebsite || false;
    this.taxCode = Business.taxCode || '';
    this.tradingId = Business.tradingId || undefined;
  }
}

export class IContactModel {
  email?: string;
  firstName?: string;
  lastName?: string;
  tel?: string;
  fax?: string;
  mobile?: string;
  webSite?: string;
  birthday?: string;
  showOnWebsite?: boolean;
  imageId?: number;
  titleId?: number;
  trustLevelId?: number;
  constructor() {
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.tel = '';
    this.fax = '';
    this.mobile = '';
    this.webSite = '';
    this.birthday = '';
    this.showOnWebsite = false;
    this.imageId = undefined;
    this.titleId = undefined;
    this.trustLevelId = undefined;
  }
}

export class IAddressModel {
  id?: number;
  suburb?: string;
  postcode?: string;
  state?: string;
  number?: string;
  address?: string;
  address2?: string;
  country?: string;
  longitude?: number;
  latitude?: number;
  constructor() {
    this.suburb = '';
    this.postcode = '';
    this.state = '';
    this.number = '';
    this.address = '';
    this.address2 = '';
    this.country = '';
    this.longitude = null;
    this.latitude = null;
  }
}
