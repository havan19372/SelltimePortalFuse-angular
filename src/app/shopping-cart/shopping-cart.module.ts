import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCarteListComponent } from './shopping-carte-list/shopping-carte-list.component';
import { ShoppingCarteRoutingModule } from './shopping-carte-route.module';
import { FuseMainModule } from '../main/main.module';
import { MaterialModule } from '../core/modules/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProductsListService } from '../products/products-list/products-list.service';
import { ShoppingCartService } from './shopping-cart.service';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { AgmCoreModule } from '@agm/core';
 
@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    FuseMainModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpJ4dgPsgX_OmPj9NGrF35zIVOWejGfBU',
    }),
    ShoppingCarteRoutingModule,
  ],
  declarations: [ ShoppingCarteListComponent, AddressDetailsComponent, CartDetailsComponent, InvoiceDetailsComponent],
  providers:[ProductsListService,ShoppingCartService],
  entryComponents: [AddressDetailsComponent]

})
export class ShoppingCartModule { }
