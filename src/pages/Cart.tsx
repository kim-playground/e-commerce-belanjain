import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    // Simple promo code logic
    const promoCodes: { [key: string]: number } = {
      SAVE10: 0.1,
      SAVE20: 0.2,
      BELANJAIN: 0.15,
    };

    const code = promoCode.toUpperCase();
    if (promoCodes[code]) {
      setDiscount(promoCodes[code]);
      toast.success(`Promo code applied! ${promoCodes[code] * 100}% discount`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  const subtotal = getTotal();
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  return (
    <Layout>
      <div className="container-wide py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-foreground lg:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-muted-foreground">
            {getItemCount()} {getItemCount() === 1 ? "item" : "items"} in your
            cart
          </p>
        </div>

        {cart.length === 0 ? (
          <Card className="py-16">
            <CardContent className="text-center">
              <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 font-display text-xl font-medium">
                Your cart is empty
              </h3>
              <p className="mt-2 text-muted-foreground">
                Add some products to get started!
              </p>
              <Button asChild className="mt-6">
                <Link to="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-display text-xl font-medium">Items</h2>
                    <Button variant="ghost" size="sm" onClick={clearCart}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Cart
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 border-b border-border pb-4 last:border-0"
                      >
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <Link
                              to={`/products/${item.id}`}
                              className="font-medium hover:text-primary"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-medium">
                    Order Summary
                  </h2>

                  {/* Promo Code */}
                  <div className="mt-6">
                    <label className="text-sm font-medium">Promo Code</label>
                    <div className="mt-2 flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button onClick={handleApplyPromo}>Apply</Button>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Try: SAVE10, SAVE20, BELANJAIN
                    </p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="mt-6 space-y-3 border-t border-border pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Discount ({discount * 100}%)
                        </span>
                        <span className="font-medium text-green-600">
                          -${discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3 text-lg font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="mt-6 w-full" size="lg" asChild>
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button variant="outline" className="mt-2 w-full" asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
