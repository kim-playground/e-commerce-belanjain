import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridSkeleton } from "@/components/products/LoadingState";
import { ErrorState } from "@/components/products/ErrorState";
import { useProducts } from "@/hooks/useProducts";

const Products = () => {
  const { data: products, isLoading, error, refetch } = useProducts();

  return (
    <Layout>
      <section className="py-12 lg:py-16">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-10">
            <h1 className="animate-fade-up font-display text-3xl font-semibold text-foreground opacity-0 lg:text-4xl">
              All Products
            </h1>
            <p className="animate-fade-up stagger-1 mt-2 text-muted-foreground opacity-0">
              Browse our complete collection of curated essentials
            </p>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <ProductGridSkeleton />
          ) : error ? (
            <ErrorState
              message="Failed to load products. Please try again."
              onRetry={() => refetch()}
            />
          ) : products && products.length > 0 ? (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                {products.length} product{products.length !== 1 ? "s" : ""}
              </p>
              <ProductGrid products={products} />
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                No products available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
