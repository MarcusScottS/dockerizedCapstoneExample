import { Component, Input,OnInit } from '@angular/core';
import { UserOrder } from 'src/app/interfaces/user-order';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  @Input()
  orderData!: UserOrder;

  constructor() { }

  ngOnInit(): void {
  }

}
