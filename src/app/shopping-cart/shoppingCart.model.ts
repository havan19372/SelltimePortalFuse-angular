export class ShopingCartModel {
    id?: number;
    cardNumber?: string;
    fromDate?: string;
    toDate?: string;
    productCounts?: number;
    paymentTotal?: string;
    paymentMethod?: string;
    status?: string;
    notes?: string;
    website?: string;
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


    constructor(shopingCart?: ShopingCartModel) {
        shopingCart = shopingCart ? shopingCart : {};
        this.id = shopingCart.id ? shopingCart.id : null;
        this.cardNumber = shopingCart.cardNumber ? shopingCart.cardNumber : '';
        this.fromDate = shopingCart.fromDate ? shopingCart.fromDate : '';
        this.toDate = shopingCart.toDate ? shopingCart.toDate : '';
        this.productCounts = shopingCart.productCounts ? shopingCart.productCounts : null;
        this.paymentTotal = shopingCart.paymentTotal ? shopingCart.paymentTotal : '';
        this.paymentMethod = shopingCart.paymentMethod ? shopingCart.paymentMethod : '';
        this.status = shopingCart.status ? shopingCart.status : '';
        this.website = shopingCart.website ? shopingCart.website : '';
        this.contact = shopingCart.contact ? shopingCart.contact :{};
        this.address = shopingCart.address ? shopingCart.address :{};

        
    }
}