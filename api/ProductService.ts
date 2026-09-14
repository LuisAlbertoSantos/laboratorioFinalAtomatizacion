import { APIRequestContext, APIResponse } from '@playwright/test';

export interface ProductPayload {
  category: string;
  description: string;
  freeShipping: boolean;
  name: string;
  originalPrice: number;
  price: number;
  rating: number;
  seller: string;
  stock: number;
}

export interface ProductResponse extends ProductPayload {
  id: string;
  createdAt?: string;
}

export class ProductService {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || "https://techstore-demo-05ad.onrender.com";
  }

  // POST (Crear)
  async createProduct(request: APIRequestContext, nuevoProducto: ProductPayload, authToken: string): Promise<APIResponse> {
    return await request.post(`${this.baseURL}/api/products`, {
      data: nuevoProducto,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  // GET (Consultar un producto por ID)
  async getProductById(request: APIRequestContext, productId: string): Promise<APIResponse> {
    return await request.get(`${this.baseURL}/api/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // PUT (Actualizar un producto por ID)
  async updateProduct(request: APIRequestContext, productId: string, productoActualizado: Partial<ProductPayload>, authToken: string): Promise<APIResponse> {
    return await request.put(`${this.baseURL}/api/products/${productId}`, {
      data: productoActualizado,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  // DELETE (Eliminar un producto por ID)
  async deleteProduct(request: APIRequestContext, productId: string, authToken: string): Promise<APIResponse> {
    return await request.delete(`${this.baseURL}/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
}