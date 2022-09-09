import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

    constructor(public orderService: OrderDataService, public cartService: CartService) { }

    ngOnInit(): void {
    }

    placeOrder() {
        this.orderService.placeOrder();
    }

}
