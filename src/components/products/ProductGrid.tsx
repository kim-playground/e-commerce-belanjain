import { Product } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-up opacity-0"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
