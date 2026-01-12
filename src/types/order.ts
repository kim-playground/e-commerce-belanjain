export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  discount_amount: number;
  promo_code: string | null;
  payment_method: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
  created_at: string;
}

export interface OrderTracking {
  id: string;
  order_id: string;
  status: OrderStatus;
  description: string;
  created_at: string;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "packed"
  | "shipped"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface CreateOrderData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  discount_amount: number;
  promo_code?: string;
  payment_method: string;
  items: {
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    subtotal: number;
  }[];
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
  tracking: OrderTracking[];
}
