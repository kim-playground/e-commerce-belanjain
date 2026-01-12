import { Link } from "react-router-dom";
import { Product } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image_url: product.image_url || "",
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image_url: product.image_url || "",
    });
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <article className="card-elevated overflow-hidden rounded-lg bg-card">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}

          {/* Wishlist Button */}
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100",
              isInWishlist(product.id) && "opacity-100"
            )}
            onClick={handleWishlistClick}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isInWishlist(product.id) && "fill-current text-red-500"
              )}
            />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display text-lg font-medium text-card-foreground transition-colors group-hover:text-accent">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {product.description || "No description available"}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <p className="font-body text-lg font-semibold text-foreground">
              ${Number(product.price).toFixed(2)}
            </p>
            <Button
              size="sm"
              className="opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}
