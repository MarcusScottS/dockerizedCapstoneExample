import { NewOrderItem } from "./new-order-item";

export interface NewOrder {
    restaurantNotes?: String;
    driverNotes?: String;
    subTotal: number;
    deliveryFee: number;
    tax: number;
    tip?: number;
    total: number;
    netLoyalty?: number;
    timeCreated?: Date;
    restaurantIds: number[];
    discountIds?: number[];
    items: NewOrderItem[];
}
