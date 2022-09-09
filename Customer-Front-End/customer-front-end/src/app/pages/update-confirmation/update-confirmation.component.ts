import { Component, OnInit } from '@angular/core';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-update-confirmation',
  templateUrl: './update-confirmation.component.html',
  styleUrls: ['./update-confirmation.component.css']
})
export class UpdateConfirmationComponent implements OnInit {

  updatedSuccessfully:boolean = false;

  constructor(public orderService: OrderDataService) { }

  ngOnInit(): void {
    this.updatedSuccessfully = this.orderService.updateSuccessful;
    this.orderService.updateSuccessful = false;
  }

}
