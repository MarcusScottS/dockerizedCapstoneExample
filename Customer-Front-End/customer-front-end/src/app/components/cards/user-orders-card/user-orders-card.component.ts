import { Component, Input, OnInit } from '@angular/core';
import { UserOrder } from 'src/app/interfaces/user-order'

@Component({
  selector: 'app-user-orders-card',
  templateUrl: './user-orders-card.component.html',
  styleUrls: ['./user-orders-card.component.css']
})
export class UserOrdersCardComponent implements OnInit {

  @Input()
  orderData!: UserOrder;
  @Input()
  userId!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
