import { NgModule } from '@angular/core';
import { FuseSharedModule as SharedModule } from '@fuse/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule, Routes } from '@angular/router';

import { FuseEcommerceProductComponent } from './single/single.component';
import { EcommerceProductService } from './single/single.service';
import { AgmCoreModule } from '@agm/core';

import { productRouting } from './products.routing';
import { CommonModule } from '@angular/common';
import { FuseMainModule } from '../main/main.module';
import { BlockUIModule } from 'ng-block-ui';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsListService } from './products-list/products-list.service';
import { MainProductTabComponent } from './single/main-product-tab/main-product-tab.component';
import { ProductImagesTabComponent } from './single/product-images-tab/product-images-tab.component';
import { ProductPricesTabComponent } from './single/product-prices-tab/product-prices-tab.component';
import { FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from 'app/core/modules/material.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    CommonModule,
    FuseMainModule,
    productRouting,
    FuseWidgetModule,
    NgxChartsModule,
    BlockUIModule.forRoot()
    //    AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCSitmogSf5UERTDMqnYRODwI6j92lcGT0'
    // })
  ],
  declarations: [FuseEcommerceProductComponent, ProductsListComponent, MainProductTabComponent, ProductImagesTabComponent, ProductPricesTabComponent],
  providers: [EcommerceProductService, ProductsListService]
})
export class ProductsModule {}
