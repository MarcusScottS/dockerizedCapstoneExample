import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';
import { MenuItem } from '../interfaces/menu-item';
import { OrderDataService } from './order-data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    cart: CartItem[] = [];

    constructor() {

    }

    addItemToCart(item: CartItem) {
        this.cart.push(item);
        console.log(this.cart);
    }

    removeFromCart(cartId: number) {
        this.cart.splice(cartId, 1);
        console.log(this.cart);
    }

    clearCart() {
        this.cart = [];
    }
}
