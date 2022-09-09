import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/interfaces/cart-item';

@Component({
  selector: 'app-menu-item-modal',
  templateUrl: './menu-item-modal.component.html',
  styleUrls: ['./menu-item-modal.component.css']
})
export class MenuItemModalComponent implements OnInit {

    @Input()
    data!: MenuItem;

    notes: String = "";
  
    constructor(public activeModal: NgbActiveModal, private cartService: CartService) {
    }

    ngOnInit(): void {
        
    }

    addToCart() {
        let cartItem = {
            menuItemId: this.data.itemId,
            name: this.data.name,
            price: this.data.price,
            description: this.data.description,
            image_url: this.data.image_url
        }
        this.cartService.addItemToCart(cartItem);
        this.activeModal.close("Cart click");
    }

    /*updateNotes() {
        this.cartItem.notes = 
    }*/
}
