import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyListComponent } from './property-list/property-list.component';
import { SingleComponent } from './single/single.component';
import { MainPropertyTabComponent } from './single/main-property-tab/main-property-tab.component';
import { PropertyImagesTabComponent } from './single/property-images-tab/property-images-tab.component';
import { FuseSharedModule as SharedModule } from '@fuse/shared.module';
import { FuseMainModule } from '../main/main.module';
import { MaterialModule } from '../core/modules/material.module';
import { propertyRouting } from './property.routing';
import { FuseWidgetModule } from '@fuse/components';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BlockUIModule } from 'ng-block-ui';
import { EcommerceProductService } from '../products/single/single.service';
import { ProductsListService } from '../products/products-list/products-list.service';
import { MainProductTabComponent } from '../products/single/main-product-tab/main-product-tab.component';
import { PropertyPricesTabComponent } from './single/property-prices-tab/property-prices-tab.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CommonModule,
    FuseMainModule,
    propertyRouting,
    FuseWidgetModule,
    NgxChartsModule,
    BlockUIModule.forRoot()
  ],
  declarations: [PropertyListComponent,SingleComponent, MainPropertyTabComponent, PropertyImagesTabComponent, PropertyPricesTabComponent],
  providers: [EcommerceProductService, ProductsListService]
})
export class PropertyModule { }
