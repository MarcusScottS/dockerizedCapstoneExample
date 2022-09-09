import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDataService } from 'src/app/services/order-data.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { DatePipe } from '@angular/common';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { OrderItem } from 'src/app/interfaces/order-item';
import { UserOrder } from 'src/app/interfaces/user-order';
import { NewOrder } from 'src/app/interfaces/new-order';
import { NewOrderItem } from 'src/app/interfaces/new-order-item';
import { MenuItem } from 'src/app/interfaces/menu-item';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  // booleans
  addingItem: boolean = false;
  allMenuItemsLoaded: boolean = false;
  cancelling: boolean = false;
  editing: boolean = false;
  orderCanceled: boolean = false;
  orderLoaded: boolean = false;
  removingItem: boolean = false;
  restaurantsLoaded: boolean = false;
  restaurantMenuLoaded: boolean = false;

  // id's
  orderID!: string|null;
  restaurantID!:  any|null;
  userID!: any;

  // update inputs
  updateTip!: number|null;
  driverNotes!: string|null;
  restaurantNotes!: string|null;

  // models
  order!: UserOrder;
  orderItems: OrderItem[] = [];
  editedOrder: NewOrder;
  editedOrderItem!: NewOrderItem;

  addedMenuItem!: OrderItem|{};
  allMenuItems: MenuItem[] = [];
  allRestaurants!: Restaurant[];
  restaurant: string = "default";
  restaurantMenu: MenuItem[] = [];


  constructor(private orderDataService: OrderDataService, private restaurantService: RestaurantService, private route: ActivatedRoute, private datePipe:DatePipe) { 
    this.editedOrder = {
      subTotal: 0,
      deliveryFee: 0,
      tax: 0,
      total: 0,
      tip: 0,
      restaurantIds: [],
      items:[]
    },
    this.editedOrderItem = {
      menuItemId: 0,
      price : 0
    }
  }

  ngOnInit(): void {
    // createUserOrder data on load
    this.route.paramMap.subscribe(params => {
      this.orderID = params.get("orderId");
      this.userID = params.get("userId");
      this.orderLoaded = false;
      if(this.orderID){
        this.orderDataService.getSelectedOrder(this.userID , this.orderID).subscribe((data: UserOrder) => {
          if(data){
            this.orderLoaded = true;
            for(let i = 0; i < data.items.length; i++){
                if(data.items[i].enabled == false){
                  // console.log('item enabled is false, do not display to user ' + data.items[i])
                } else {
                  this.orderItems.push(data.items[i]);
                }
              }
            this.order = data;
            if(this.order.orderStatus == "canceled"){
              this.orderCanceled = true;
            }
            this.order.items = this.orderItems;
          } 
        })
      }
    })
    this.loadRestaurants();
  }

  loadRestaurants(){
    if(this.restaurantsLoaded == false){
        this.restaurantService.getAllRestaurants().subscribe((data: Restaurant[]) => {
          if(data){
            this.allRestaurants = [...data];
          }
        });
    }
  }

  loadEditPage(){
    this.editing = true;
    if(this.allMenuItemsLoaded == false){
      this.loadAllMenuItems();
      this.allMenuItemsLoaded = true;
    }
  }


  removeItem(itemIndex: number){
    this.orderItems.splice(itemIndex, 1);
  }

  loadAddItem(){
    this.addingItem = true;
  }

  addItem(itemIndex: number){
    this.orderItems[this.orderItems.length] = {
      "id": 0,
      "name": this.restaurantMenu[itemIndex].name,
      "description": "",
      "enabled": true,
      "menuItemId": this.restaurantMenu[itemIndex].itemId,
      "price": this.restaurantMenu[itemIndex].price,
    }
  }

  loadAllMenuItems(){
    this.allMenuItemsLoaded = true;
    for(let i = 0; i < this.allRestaurants.length; i++){
      this.restaurantID = this.allRestaurants[i].restaurantId;
      this.restaurantService.getRestaurantMenu(this.restaurantID).subscribe((data: MenuItem[]) => {
          if(data) {
              for(let item of data){
                this.allMenuItems.push(item);
              }
          } else {
            console.log('no menu items loaded');
          }       
      });
    }
  }

  loadRestaurantMenu(restaurant: string){
    this.restaurantMenu = [];
    for(let i = 0; i < this.allMenuItems.length; i++){
      if(this.allMenuItems[i].restaurant_name == restaurant){
        this.restaurantMenu.push(this.allMenuItems[i]);
      }
    }
    this.restaurantMenuLoaded = true;
  }

  matchMenuItemToOrderItem(){
    // this.orderItems.forEach
    for(let i = 0; i < this.orderItems.length; i++){
      this.editedOrderItem.menuItemId = 0;
      for(let x = 0; x < this.allMenuItems.length; x++){
        if(this.allMenuItems[x].name == this.orderItems[i].name){
          this.editedOrder.items.push({menuItemId: this.allMenuItems[x].itemId, price: this.allMenuItems[x].price});
        }
      }
    }
  }

  sendEdit(){
    // calculate Tip
    if(this.order.tip == null){
      this.order.tip = 0;
    }
    if(this.updateTip == null){
      this.editedOrder.tip = this.order.tip;
    } else {
      this.order.total = this.order.total - this.order.tip;
      this.order.tip = this.updateTip;
      this.editedOrder.tip = this.order.tip;
    }

    // check order notes have a value
    if(this.driverNotes == null){
      this.editedOrder.driverNotes = this.order.driverNotes;
    } else {
      this.editedOrder.driverNotes = this.driverNotes;
    }
    if(this.restaurantNotes == null){
      this.editedOrder.restaurantNotes = this.order.restaurantNotes;
    } else {
      this.editedOrder.restaurantNotes = this.restaurantNotes;
    }

    // no items added or removed, so just send original items from order
    if(this.allMenuItemsLoaded == false){
      this.editedOrder.items = this.orderItems;
    }

    // need menu item id in order to send our items
    this.matchMenuItemToOrderItem();

    // get total of all items being sent
    for(let item of this.editedOrder.items){
      // console.log('items to be sent for update', item);
      this.editedOrder.subTotal += item.price;
    }

    this.editedOrder.deliveryFee = this.order.deliveryFee;

    // don't calculate tax if we do not have any items in order
    if(this.editedOrder.items.length == 0){
      this.editedOrder.tax = 0;
    } else {
      this.editedOrder.tax = this.order.tax;
    }

    this.editedOrder.total = this.editedOrder.tip + this.editedOrder.deliveryFee + this.editedOrder.tax + this.editedOrder.subTotal;
    
    console.log('sending to update: ', this.editedOrder);
    this.orderDataService.updateOrder(this.userID, this.order.orderId, this.editedOrder);
  }
  
  cancelEdit(){
    this.editing = false;
    this.addingItem = false;
    console.log("cancel edit button clicked");
    location.reload();
  }

  cancelOrder(){
    console.log("cancel order button clicked");
    this.orderDataService.cancelOrder(this.userID, this.order.orderId, this.order);

  }
}