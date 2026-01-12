import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrders";
import { useNavigate } from "react-router-dom";
import { CreditCard, Wallet, Building2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    payment_method: "credit_card",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData({
      ...formData,
      payment_method: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (
      !formData.customer_name ||
      !formData.customer_email ||
      !formData.customer_phone ||
      !formData.customer_address
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(async () => {
      try {
        const orderData = {
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          customer_address: formData.customer_address,
          total_amount: getTotal(),
          discount_amount: 0,
          payment_method: formData.payment_method,
          items: cart.map((item) => ({
            product_id: item.id,
            product_name: item.name,
            product_price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
          })),
        };

        const order = await createOrder.mutateAsync(orderData);

        // Simulate payment success
        toast.success("Payment successful! 🎉");

        // Clear cart
        clearCart();

        // Store customer email for order history
        localStorage.setItem("customer_email", formData.customer_email);

        // Navigate to order tracking
        navigate(`/orders/${order.id}`);
      } catch (error) {
        toast.error("Payment failed. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }, 2000);
  };

  const paymentMethods = [
    { id: "credit_card", name: "Credit Card", icon: CreditCard },
    { id: "e_wallet", name: "E-Wallet", icon: Wallet },
    { id: "bank_transfer", name: "Bank Transfer", icon: Building2 },
  ];

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container-wide py-12">
          <Card className="py-16">
            <CardContent className="text-center">
              <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 font-display text-xl font-medium">
                Your cart is empty
              </h3>
              <p className="mt-2 text-muted-foreground">
                Add some products before checkout
              </p>
              <Button asChild className="mt-6">
                <a href="/products">Browse Products</a>
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
        <h1 className="mb-8 font-display text-3xl font-semibold text-foreground lg:text-4xl">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Customer Information */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customer_name">Full Name *</Label>
                    <Input
                      id="customer_name"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customer_email">Email *</Label>
                    <Input
                      id="customer_email"
                      name="customer_email"
                      type="email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customer_phone">Phone Number *</Label>
                    <Input
                      id="customer_phone"
                      name="customer_phone"
                      type="tel"
                      value={formData.customer_phone}
                      onChange={handleInputChange}
                      placeholder="+62 812 3456 7890"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customer_address">Shipping Address *</Label>
                    <Textarea
                      id="customer_address"
                      name="customer_address"
                      value={formData.customer_address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete shipping address"
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.payment_method}
                    onValueChange={handlePaymentMethodChange}
                  >
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-secondary/50"
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label
                          htmlFor={method.id}
                          className="flex flex-1 cursor-pointer items-center gap-3"
                        >
                          <method.icon className="h-5 w-5" />
                          <span>{method.name}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ${getTotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing Payment..." : "Place Order"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By placing this order, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
