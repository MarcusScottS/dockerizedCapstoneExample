import { Component, OnInit } from '@angular/core';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

    orderSuccessful:boolean = false;

    constructor(public orderService: OrderDataService) { }

    ngOnInit(): void {
        this.orderSuccessful = this.orderService.orderSuccessful;
        this.orderService.orderSuccessful = false;
    }

}
