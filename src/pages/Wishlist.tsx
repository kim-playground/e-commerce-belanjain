import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
    });
  };

  return (
    <Layout>
      <div className="container-wide py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground lg:text-4xl">
              My Wishlist
            </h1>
            <p className="mt-2 text-muted-foreground">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          {wishlist.length > 0 && (
            <Button variant="outline" onClick={clearWishlist}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <Card className="py-16">
            <CardContent className="text-center">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 font-display text-xl font-medium">
                Your wishlist is empty
              </h3>
              <p className="mt-2 text-muted-foreground">
                Start adding products you love!
              </p>
              <Button asChild className="mt-6">
                <Link to="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display text-lg font-medium">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xl font-semibold text-primary">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

export default Wishlist;
