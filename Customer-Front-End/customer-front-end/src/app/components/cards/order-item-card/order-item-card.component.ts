import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-order-item-card',
  templateUrl: './order-item-card.component.html',
  styleUrls: ['./order-item-card.component.css']
})
export class OrderItemCardComponent implements OnInit {

    @Input()
    data!: CartItem;
    @Input()
    itemID!: number;

    constructor(public orderService: OrderDataService, public cartService: CartService) { }

    ngOnInit(): void {
    }

    removeItem() {
        this.orderService.removeItemFromOrder(this.itemID);
    }
}
