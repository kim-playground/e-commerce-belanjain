// API client for backend Express server
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "API request failed");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Products endpoints
  async getProducts(params?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    featured?: boolean;
    sort?: string;
  }) {
    const queryParams = new URLSearchParams();

    if (params?.category) queryParams.append("category", params.category);
    if (params?.minPrice)
      queryParams.append("minPrice", params.minPrice.toString());
    if (params?.maxPrice)
      queryParams.append("maxPrice", params.maxPrice.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.featured !== undefined)
      queryParams.append("featured", params.featured.toString());
    if (params?.sort) queryParams.append("sort", params.sort);

    const query = queryParams.toString();
    const endpoint = query ? `/products?${query}` : "/products";

    return this.request<any[]>(endpoint);
  }

  async getProduct(id: string) {
    return this.request<any>(`/products/${id}`);
  }

  async createProduct(product: any) {
    return this.request<any>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id: string, product: any) {
    return this.request<any>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id: string) {
    return this.request<any>(`/products/${id}`, {
      method: "DELETE",
    });
  }

  async getCategories() {
    return this.request<string[]>("/products/categories");
  }
}

export const apiClient = new ApiClient(API_URL);
export default apiClient;
