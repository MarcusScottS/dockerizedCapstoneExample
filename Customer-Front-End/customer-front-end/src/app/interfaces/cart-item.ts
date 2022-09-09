export interface CartItem {
    /* NEW ORDER ITEM FIELDS */
    menuItemId: number;
    notes?: String;
    discount?: number;
    price: number;
    discountIDs?: number[];
    /* MENU ITEM FIELDS */
    name: String;
    description: String;
    image_url: String;
}
