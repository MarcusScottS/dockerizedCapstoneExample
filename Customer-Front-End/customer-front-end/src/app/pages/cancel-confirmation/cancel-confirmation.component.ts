import { Component, OnInit } from '@angular/core';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-cancel-confirmation',
  templateUrl: './cancel-confirmation.component.html',
  styleUrls: ['./cancel-confirmation.component.css']
})
export class CancelConfirmationComponent implements OnInit {

  cancelledSuccessfully:boolean = false;

  constructor(public orderService: OrderDataService ) { }

  ngOnInit(): void {
    this.cancelledSuccessfully = this.orderService.cancelSuccessful;
    this.orderService.cancelSuccessful = false;
  }

}
