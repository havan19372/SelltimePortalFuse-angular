import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order, ShoppingCartOrder } from './ShoppingCartOrder.model';
import { Subscription } from 'rxjs';
import { orderStatuses } from './order-statuses';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
 
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class CartDetailsComponent implements OnInit {
  order = new Order();
  shoppingCarteOrder=new ShoppingCartOrder();
  onOrderChanged: Subscription;
  statusForm: FormGroup;
  orderStatuses = orderStatuses;
  baseUrl=environment.ImageApiUrl;
  @ViewChild('printDiv') el:ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private fuseConfig: FuseConfigService,
    private shoppingCartService:ShoppingCartService,
    private route: ActivatedRoute

  ) {
    this.fuseConfig.setConfig({
      layout: {
        navigation: 'none',
        toolbar:'none',
        footer: 'none'
      }
    });
  }

  ngOnInit() {
     this.route.params.subscribe(params => {
      this.shoppingCartService.getShoppingCartDetails(params['id']).subscribe((data)=>{
        this.shoppingCarteOrder=new ShoppingCartOrder(data);
      })
      // In a real app: dispatch action to load the details here.
   });
  
    this.statusForm = this.formBuilder.group({
      newStatus: ['']
    });
  }

  ngOnDestroy() {
   // this.onOrderChanged.unsubscribe();
  }

  updateStatus() {
    const newStatusId = Number.parseInt(this.statusForm.get('newStatus').value);

    if (!newStatusId) {
      return;
    }

    const newStatus = this.orderStatuses.find((status) => {
      return status.id === newStatusId;
    });

    newStatus['date'] = new Date().toString();

    this.order.status.unshift(newStatus);
  }

  printCartDetail()
  {
    window.print();

  }

  createPdf(): void {
    debugger;
    this.route.params.subscribe(params => {
        window.open(`${environment.DevApiUrl}/Pdf/InvoicePDf/${params['id']}?${this.shoppingCarteOrder.cartId}`,'_blank');
      })

   
}
}
