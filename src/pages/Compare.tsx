import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/useProducts";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";

const Compare = () => {
  const { data: products } = useProducts();

  // For demo, compare first 3 products
  const compareProducts = products?.slice(0, 3) || [];

  const features = [
    "Quality Rating",
    "Warranty",
    "Free Shipping",
    "Return Policy",
    "Customer Support",
  ];

  return (
    <Layout>
      <div className="container-wide py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
          <h1 className="font-display text-3xl font-semibold text-foreground lg:text-4xl">
            Product Comparison
          </h1>
          <p className="mt-2 text-muted-foreground">
            Compare features and specifications side by side
          </p>
        </div>

        {compareProducts.length === 0 ? (
          <Card className="py-16">
            <CardContent className="text-center">
              <p className="text-muted-foreground">No products to compare</p>
              <Button asChild className="mt-4">
                <Link to="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-48 border-b border-border p-4 text-left">
                    <span className="text-sm font-medium text-muted-foreground">
                      Features
                    </span>
                  </th>
                  {compareProducts.map((product) => (
                    <th key={product.id} className="border-b border-border p-4">
                      <Card className="overflow-hidden">
                        <div className="aspect-square overflow-hidden bg-secondary">
                          <img
                            src={product.image || ""}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-display font-medium">
                            {product.name}
                          </h3>
                          <p className="mt-2 text-xl font-semibold text-primary">
                            ${product.price.toFixed(2)}
                          </p>
                          <Button asChild className="mt-4 w-full" size="sm">
                            <Link to={`/products/${product.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-border p-4 font-medium">
                    Price
                  </td>
                  {compareProducts.map((product) => (
                    <td
                      key={product.id}
                      className="border-b border-border p-4 text-center"
                    >
                      <span className="text-lg font-semibold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border-b border-border p-4 font-medium">
                    Description
                  </td>
                  {compareProducts.map((product) => (
                    <td
                      key={product.id}
                      className="border-b border-border p-4 text-center text-sm text-muted-foreground"
                    >
                      {product.description || "No description available"}
                    </td>
                  ))}
                </tr>
                {features.map((feature, index) => (
                  <tr key={feature}>
                    <td className="border-b border-border p-4 font-medium">
                      {feature}
                    </td>
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        className="border-b border-border p-4 text-center"
                      >
                        {index % 2 === 0 ? (
                          <div className="flex justify-center">
                            <Badge variant="default" className="gap-1">
                              <Check className="h-3 w-3" />
                              Yes
                            </Badge>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <Badge variant="secondary" className="gap-1">
                              <X className="h-3 w-3" />
                              No
                            </Badge>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Compare;
