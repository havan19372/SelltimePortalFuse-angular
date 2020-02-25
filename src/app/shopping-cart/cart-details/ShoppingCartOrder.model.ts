import { FuseUtils } from '@fuse/utils';

export class Order {
  id: string;
  reference: string;
  subtotal: string;
  tax: string;
  discount: string;
  total: string;
  date: string;
  customer: any;
  products: any[];
  status: any[];
  payment: any;
  shippingDetails: any[];

  constructor(order?) {
    order = order || {};
    this.id = order.id || FuseUtils.generateGUID();
    this.reference = order.reference || FuseUtils.generateGUID();
    this.subtotal = order.subtotal || 0;
    this.tax = order.tax || 0;
    this.discount = order.discount || 0;
    this.total = order.total || 0;
    this.date = order.date || '';
    this.customer = order.customer || {};
    this.products = order.products || [];
    this.status = order.status || [];
    this.payment = order.payment || {};
    this.shippingDetails = order.shippingDetails || [];
  }
}

export class ShoppingCartOrder {
  id: number;
  eventId: number;
  voucherCode: string;
  cartId: string;
  cardNumber?: string;
  fromDate?: string;
  toDate?: string;
  productCounts?: number;
  paymentTotal?: string;
  paymentMethod?: string;
  status?: string;
  notes?: string;
  website?: string;

  joinMailingList: boolean;
  acceptTerms: boolean;
  cartSubTotal: number;
  cartDiscount: number;
  cartDelivery: number;
  cartNett: number;
  cartTax: number;
  cartGross: number;
  nameOnCard: string;
  cardCvv: string;

  contactId: number;
  addressId: number;
  websiteId: number;
  paymentMethodId: number;



  contact?: {
    tel?: string,
    fax?: string,
    mobile?: string,
    webSite?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    birthday?: string,
    showOnWebsite?: boolean,
  };
  address?: {
    suburb?: string,
    postcode?: string,
    state?: string,
    number?: string,
    address?: string,
    address2?: string,
    country?: string,
    longitude?: number,
    latitude?: number
  };
  products: any[];
  history: any[];
  registrations: any[];
  string?: any;
  constructor(shopingCart?) {
    shopingCart = shopingCart ? shopingCart : {};

    this.id = shopingCart.id ? shopingCart.id : null;
    this.cartId = shopingCart.cartId || FuseUtils.generateGUID();
    this.status = shopingCart.status || [];
    this.cardNumber = shopingCart.cardNumber ? shopingCart.cardNumber : '';
    this.fromDate = shopingCart.fromDate ? shopingCart.fromDate : '';
    this.toDate = shopingCart.toDate ? shopingCart.toDate : '';
    this.productCounts = shopingCart.productCounts ? shopingCart.productCounts : null;
    this.paymentTotal = shopingCart.paymentTotal ? shopingCart.paymentTotal : '';
    this.paymentMethod = shopingCart.paymentMethod ? shopingCart.paymentMethod : '';
    this.status = shopingCart.status ? shopingCart.status : '';
    this.website = shopingCart.website ? shopingCart.website : '';
    this.contact = shopingCart.contact ? shopingCart.contact : {};
    this.address = shopingCart.address ? shopingCart.address : {};
    this.joinMailingList = shopingCart.joinMailingList ? shopingCart.joinMailingList : true;
    this.acceptTerms = shopingCart.acceptTerms ? shopingCart.acceptTerms : false;
    this.cartSubTotal = shopingCart.cartSubTotal ? shopingCart.cartSubTotal : 0;
    this.cartDiscount = shopingCart.cartDiscount ? shopingCart.cartDiscount : 0;
    this.cartDelivery = shopingCart.cartDelivery ? shopingCart.cartDelivery : 0;
    this.cartNett = shopingCart.cartNett ? shopingCart.cartNett : 0;
    this.cartTax = shopingCart.cartTax ? shopingCart.cartTax : 0;
    this.cartGross = shopingCart.cartGross ? shopingCart.cartGross : 0;
    this.nameOnCard = shopingCart.nameOnCard ? shopingCart.nameOnCard : '';
    this.cardCvv = shopingCart.cardCvv ? shopingCart.cardCvv : '';
    this.addressId = shopingCart.addressId ? shopingCart.addressId : 0;
    this.contactId = shopingCart.contactId ? shopingCart.contactId : 0;
    this.websiteId = shopingCart.websiteId ? shopingCart.websiteId : 0;
    this.paymentMethodId = shopingCart.paymentMethodId ? shopingCart.paymentMethodId : 0;
    this.products = shopingCart.products || [];
    this.history = shopingCart.history || [];
    this.registrations = shopingCart.registrations || [];



  }
}
