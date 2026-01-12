import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOrders } from "@/hooks/useOrders";
import { Link } from "react-router-dom";
import { Package, Search } from "lucide-react";
import { OrderStatus } from "@/types/order";

const Orders = () => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const { data: orders, isLoading } = useOrders(searchEmail);

  useEffect(() => {
    // Load saved email from localStorage
    const savedEmail = localStorage.getItem("customer_email");
    if (savedEmail) {
      setCustomerEmail(savedEmail);
      setSearchEmail(savedEmail);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchEmail(customerEmail);
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

  return (
    <Layout>
      <div className="container-wide py-12">
        <h1 className="mb-8 font-display text-3xl font-semibold text-foreground lg:text-4xl">
          My Orders
        </h1>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="email">Enter your email to view orders</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-end">
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Orders List */}
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading orders...</p>
        ) : !searchEmail ? (
          <Card className="py-16">
            <CardContent className="text-center">
              <Package className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 font-display text-xl font-medium">
                Enter your email to view orders
              </h3>
              <p className="mt-2 text-muted-foreground">
                Use the email you provided during checkout
              </p>
            </CardContent>
          </Card>
        ) : orders && orders.length === 0 ? (
          <Card className="py-16">
            <CardContent className="text-center">
              <Package className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 font-display text-xl font-medium">
                No orders found
              </h3>
              <p className="mt-2 text-muted-foreground">
                You haven't placed any orders yet
              </p>
              <Button asChild className="mt-6">
                <Link to="/products">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders?.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-lg font-medium">
                          Order #{order.id.slice(0, 8)}
                        </h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Placed on{" "}
                        {new Date(order.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="mt-2 font-semibold">
                        Total: ${order.total_amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline">
                        <Link to={`/orders/${order.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
