export interface OrderItem {
    id: number;
    name: String;
    description: String;
    notes?: String;
    discount?: number;
    price: number;
    menuItemId: number;
    enabled: boolean;
}