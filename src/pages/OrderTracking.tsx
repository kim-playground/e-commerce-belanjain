import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrder } from "@/hooks/useOrders";
import { ArrowLeft, Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { OrderStatus } from "@/types/order";

const OrderTracking = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading } = useOrder(orderId);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
      case "paid":
        return <Clock className="h-5 w-5" />;
      case "processing":
      case "packed":
        return <Package className="h-5 w-5" />;
      case "shipped":
      case "in_transit":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "paid":
      case "processing":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "packed":
      case "shipped":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "in_transit":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "delivered":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    const labels: Record<OrderStatus, string> = {
      pending: "Pending Payment",
      paid: "Paid",
      processing: "Processing",
      packed: "Dikemas",
      shipped: "Dikirim",
      in_transit: "Dalam Perjalanan",
      delivered: "Selesai",
      cancelled: "Cancelled",
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container-wide py-12">
          <p className="text-center text-muted-foreground">
            Loading order details...
          </p>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container-wide py-12">
          <Card className="py-16">
            <CardContent className="text-center">
              <h3 className="font-display text-xl font-medium">
                Order not found
              </h3>
              <Button asChild className="mt-4">
                <Link to="/orders">View All Orders</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-wide py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Placed on{" "}
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Customer</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer_email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer_phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Shipping Address</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer_address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment Method</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {order.payment_method.replace("_", " ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between border-b border-border pb-4 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.product_price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${order.total_amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Tracking */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.tracking.map((track, index) => (
                    <div key={track.id} className="relative">
                      {index !== order.tracking.length - 1 && (
                        <div className="absolute left-[11px] top-8 h-full w-0.5 bg-border" />
                      )}
                      <div className="flex gap-3">
                        <div
                          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                            index === 0
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background"
                          }`}
                        >
                          {index === 0 ? (
                            getStatusIcon(track.status)
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <p className="font-medium capitalize">
                            {getStatusLabel(track.status)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {track.description}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {new Date(track.created_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderTracking;
