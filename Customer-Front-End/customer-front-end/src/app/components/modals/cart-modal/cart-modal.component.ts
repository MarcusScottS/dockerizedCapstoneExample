import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {

    constructor(public activeModal: NgbActiveModal, public cartService: CartService, private orderService: OrderDataService, private router: Router) { }

    ngOnInit(): void {
        
    }

    checkout() {
        this.activeModal.close("Checked out");
        this.orderService.setupOrder();
        this.router.navigate(["../checkout"]);
    }

}
