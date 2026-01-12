import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CreateOrderData,
  Order,
  OrderWithItems,
  OrderTracking,
  OrderStatus,
} from "@/types/order";

// Temporary localStorage-based implementation
// TODO: Migrate to Express API backend when orders endpoints are ready

const ORDERS_KEY = "belanjain_orders";
const ORDER_ITEMS_KEY = "belanjain_order_items";
const ORDER_TRACKING_KEY = "belanjain_order_tracking";

// Helper functions for localStorage
const getOrders = (): Order[] => {
  const data = localStorage.getItem(ORDERS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveOrders = (orders: Order[]) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

const getOrderItems = () => {
  const data = localStorage.getItem(ORDER_ITEMS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveOrderItems = (items: any[]) => {
  localStorage.setItem(ORDER_ITEMS_KEY, JSON.stringify(items));
};

const getOrderTracking = () => {
  const data = localStorage.getItem(ORDER_TRACKING_KEY);
  return data ? JSON.parse(data) : [];
};

const saveOrderTracking = (tracking: any[]) => {
  localStorage.setItem(ORDER_TRACKING_KEY, JSON.stringify(tracking));
};

// Fetch all orders for a customer email
export function useOrders(customerEmail?: string) {
  return useQuery({
    queryKey: ["orders", customerEmail],
    queryFn: async (): Promise<Order[]> => {
      const orders = getOrders();

      if (customerEmail) {
        return orders.filter((order) => order.customer_email === customerEmail);
      }

      return orders;
    },
    enabled: !!customerEmail,
  });
}

// Fetch single order with items and tracking
export function useOrder(orderId?: string) {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: async (): Promise<OrderWithItems | null> => {
      if (!orderId) return null;

      const orders = getOrders();
      const order = orders.find((o) => o.id === orderId);

      if (!order) return null;

      const allItems = getOrderItems();
      const items = allItems.filter((item: any) => item.order_id === orderId);

      const allTracking = getOrderTracking();
      const tracking = allTracking.filter((t: any) => t.order_id === orderId);

      return {
        ...order,
        items,
        tracking,
      } as OrderWithItems;
    },
    enabled: !!orderId,
  });
}

// Create order mutation
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: CreateOrderData): Promise<Order> => {
      const orderId = `order_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const newOrder: Order = {
        id: orderId,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        customer_address: orderData.customer_address,
        total_amount: orderData.total_amount,
        discount_amount: orderData.discount_amount || 0,
        promo_code: orderData.promo_code || null,
        payment_method: orderData.payment_method,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Save order
      const orders = getOrders();
      orders.push(newOrder);
      saveOrders(orders);

      // Save order items
      const orderItems = orderData.items.map((item) => ({
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        order_id: orderId,
        product_id: item.product_id,
        product_name: item.product_name,
        product_price: item.product_price,
        quantity: item.quantity,
        subtotal: item.subtotal,
        created_at: new Date().toISOString(),
      }));

      const allItems = getOrderItems();
      saveOrderItems([...allItems, ...orderItems]);

      // Create initial tracking
      const tracking = {
        id: `tracking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        order_id: orderId,
        status: "pending",
        description: "Pesanan berhasil dibuat dan menunggu pembayaran",
        created_at: new Date().toISOString(),
      };

      const allTracking = getOrderTracking();
      saveOrderTracking([...allTracking, tracking]);

      return newOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order created successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create order: ${error.message}`);
    },
  });
}

// Update order status mutation
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      status,
      description,
    }: {
      orderId: string;
      status: OrderStatus;
      description: string;
    }): Promise<void> => {
      // Update order status
      const orders = getOrders();
      const orderIndex = orders.findIndex((o) => o.id === orderId);

      if (orderIndex === -1) {
        throw new Error("Order not found");
      }

      orders[orderIndex].status = status;
      orders[orderIndex].updated_at = new Date().toISOString();
      saveOrders(orders);

      // Add tracking entry
      const tracking = {
        id: `tracking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        order_id: orderId,
        status,
        description,
        created_at: new Date().toISOString(),
      };

      const allTracking = getOrderTracking();
      saveOrderTracking([...allTracking, tracking]);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({
        queryKey: ["orders", variables.orderId],
      });
      toast.success("Order status updated!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });
}
