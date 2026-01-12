import { Link } from "react-router-dom";
import { ArrowRight, Package, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridSkeleton } from "@/components/products/LoadingState";
import { ErrorState } from "@/components/products/ErrorState";
import { useProducts } from "@/hooks/useProducts";
import { Newsletter } from "@/components/Newsletter";

const Index = () => {
  const { data: products, isLoading, error, refetch } = useProducts();

  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container-wide py-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-fade-up font-display text-4xl font-semibold tracking-tight text-foreground opacity-0 sm:text-5xl lg:text-6xl">
              Curated essentials for modern living
            </h1>
            <p className="animate-fade-up stagger-1 mt-6 font-body text-lg text-muted-foreground opacity-0 lg:text-xl">
              Thoughtfully designed products that bring simplicity and elegance
              to your everyday life.
            </p>
            <div className="animate-fade-up stagger-2 mt-10 flex flex-col items-center justify-center gap-4 opacity-0 sm:flex-row">
              <Button variant="hero" size="xl" asChild>
                <Link to="/products">
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border bg-card">
        <div className="container-wide py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: Package,
                title: "Quality Crafted",
                description:
                  "Every product is carefully selected for quality and durability",
              },
              {
                icon: Truck,
                title: "Free Shipping",
                description: "Complimentary shipping on all orders over $100",
              },
              {
                icon: Shield,
                title: "Secure Checkout",
                description:
                  "Your data is protected with industry-standard encryption",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="animate-fade-up flex items-start gap-4 opacity-0"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="rounded-lg bg-secondary p-3">
                  <feature.icon className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold text-foreground lg:text-4xl">
                Featured Products
              </h2>
              <p className="mt-2 text-muted-foreground">
                Our most popular items, loved by customers
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link to="/products">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : error ? (
            <ErrorState
              message="Failed to load products"
              onRetry={() => refetch()}
            />
          ) : featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">
                No products available yet.
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link to="/admin">Add your first product</Link>
              </Button>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/products">
                View all products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </Layout>
  );
};

export default Index;
