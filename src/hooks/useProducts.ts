import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

export interface Product {
  _id: string; // MongoDB uses _id
  id?: string; // For compatibility
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  rating?: number;
  reviews_count?: number;
  is_featured?: boolean;
  tags?: string[];
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}

// Fetch all products
export function useProducts(params?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  sort?: string;
}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async (): Promise<Product[]> => {
      const response = await apiClient.getProducts(params);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch products");
      }

      // Map _id to id for compatibility
      const products = (response.data || []).map((product: any) => ({
        ...product,
        id: product._id,
      }));

      return products;
    },
  });
}

// Fetch single product by ID
export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async (): Promise<Product | null> => {
      if (!id) return null;

      const response = await apiClient.getProduct(id);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch product");
      }

      if (!response.data) return null;

      // Map _id to id for compatibility
      return {
        ...response.data,
        id: response.data._id,
      };
    },
    enabled: !!id,
  });
}

// Create product mutation
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: CreateProductData): Promise<Product> => {
      const response = await apiClient.createProduct(product);

      if (!response.success) {
        throw new Error(response.message || "Failed to create product");
      }

      return {
        ...response.data,
        id: response.data._id,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create product: ${error.message}`);
    },
  });
}

// Update product mutation
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: UpdateProductData): Promise<Product> => {
      const response = await apiClient.updateProduct(id, updates);

      if (!response.success) {
        throw new Error(response.message || "Failed to update product");
      }

      return {
        ...response.data,
        id: response.data._id,
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", data.id] });
      toast.success("Product updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update product: ${error.message}`);
    },
  });
}

// Delete product mutation
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await apiClient.deleteProduct(id);

      if (!response.success) {
        throw new Error(response.message || "Failed to delete product");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete product: ${error.message}`);
    },
  });
}
