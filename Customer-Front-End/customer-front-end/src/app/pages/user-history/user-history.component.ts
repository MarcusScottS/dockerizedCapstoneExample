import { Component, OnInit } from '@angular/core';
import { UserOrder } from 'src/app/interfaces/user-order';
import { ActivatedRoute } from '@angular/router';
import { OrderDataService } from 'src/app/services/order-data.service';


@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  allOrders!: UserOrder[];
  ordersLoaded: boolean = false;
  emptyData: boolean = false;
  userID!: any|'1';

  constructor(private orderService: OrderDataService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userID = params.get("userId");
      this.orderService.getUserOrders(this.userID).subscribe((data: UserOrder[]) => {
        this.ordersLoaded = false;
        if(data.length > 0) {
            this.ordersLoaded = true;
            this.allOrders = [...data]
        } else {
          this.ordersLoaded = true;
          this.emptyData = true;
        }
      });
    });
  }

}
