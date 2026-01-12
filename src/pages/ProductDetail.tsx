import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ProductDetailSkeleton } from "@/components/products/LoadingState";
import { ErrorState } from "@/components/products/ErrorState";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error, refetch } = useProduct(id);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image_url: product.image_url || "",
    });
  };

  const handleWishlistToggle = () => {
    if (!product) return;

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

  if (isLoading) {
    return (
      <Layout>
        <ProductDetailSkeleton />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container-wide py-12">
          <ErrorState
            message="Failed to load product details"
            onRetry={() => refetch()}
          />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-wide py-20 text-center">
          <h1 className="font-display text-2xl font-semibold text-foreground">
            Product not found
          </h1>
          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="outline" className="mt-6" asChild>
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 lg:py-16">
        <div className="container-wide">
          {/* Back Link */}
          <Link
            to="/products"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>

          {/* Product Content */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="animate-fade-up overflow-hidden rounded-lg bg-secondary opacity-0">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="aspect-square h-full w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>

            {/* Details */}
            <div className="animate-fade-up stagger-1 opacity-0">
              <h1 className="font-display text-3xl font-semibold text-foreground lg:text-4xl">
                {product.name}
              </h1>

              <p className="mt-4 font-body text-3xl font-semibold text-foreground">
                ${Number(product.price).toFixed(2)}
              </p>

              <div className="mt-6 border-t border-border pt-6">
                <h2 className="font-display text-lg font-medium text-foreground">
                  Description
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {product.description ||
                    "No description available for this product."}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={handleWishlistToggle}
                  className={cn(
                    "flex-1 sm:flex-none",
                    isInWishlist(product.id) && "border-red-500 text-red-500"
                  )}
                >
                  <Heart
                    className={cn(
                      "mr-2 h-5 w-5",
                      isInWishlist(product.id) && "fill-current"
                    )}
                  />
                  {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Meta */}
              <div className="mt-8 rounded-lg bg-secondary/50 p-4">
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Availability</dt>
                    <dd className="font-medium text-foreground">In Stock</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Shipping</dt>
                    <dd className="font-medium text-foreground">
                      Free over $100
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Returns</dt>
                    <dd className="font-medium text-foreground">30 days</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
