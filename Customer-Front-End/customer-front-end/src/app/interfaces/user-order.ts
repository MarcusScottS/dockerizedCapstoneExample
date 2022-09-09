import { OrderItem } from "./order-item";

export interface UserOrder {
    orderId: number,
    orderStatus: String,
    restaurantNotes?: String;
    driverNotes?: String;
    subTotal: number;
    deliveryFee: number;
    tax: number;
    tip?: number;
    total: number;
    timeCreated?: Date;
    scheduledFor?: Date;
    netLoyalty?: number;
    driverFirstName: String,
    restaurantNames: String[];
    discounts?: String[];
    items: OrderItem[];
}
