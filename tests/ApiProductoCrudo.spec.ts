import { test, expect } from "@playwright/test";

const BASE_URL = "https://techstore-demo-05ad.onrender.com";

// Interfaces para tipar los datos (ajusta las propiedades según tu API)
interface LoginResponse {
  token: string;
  // Añade más campos si tu API los devuelve (ej. user: { ... })
}

interface ProductPayload {
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

interface ProductResponse extends ProductPayload {
  id: string; // o _id si usa MongoDB
  createdAt?: string;
}

test.describe("API Testing con Autenticación - TechStore (TypeScript)", () => {
  let authToken: string;

  // 1. Hook para autenticarse antes de las pruebas
  test.beforeAll(async ({ request }) => {
    const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        username: "admin", // Reemplaza con tu usuario real
        password: "admin123", // Reemplaza con tu contraseña real
      },
    });

    expect(loginResponse.ok()).toBeTruthy();

    const loginData = (await loginResponse.json()) as LoginResponse;
    authToken = loginData.token;
  });

  // 2. Test para crear el producto
  test("Debería crear un producto estando autenticado", async ({ request }) => {
    const nuevoProducto: ProductPayload = {
        name: "Monitor Gamer 279",
        price: 299.99,
        description: "Monitor 144Hz IPS",
        category: "Monitores",
        stock: 10,
        freeShipping: false,
        originalPrice: 0,
        rating: 0,
        seller: ""
    };

    const response = await request.post(`${BASE_URL}/api/products`, {
      data: nuevoProducto,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log(`Status Code: ${response.status()}`);
    expect(response.status()).toBe(201); // O 200 según el backend

    const responseBody = (await response.json()) as ProductResponse;

    // Aserciones tipadas
    expect(responseBody).toHaveProperty("id");
    expect(responseBody.name).toBe(nuevoProducto.name);
    expect(responseBody.price).toBe(nuevoProducto.price);
  });
});
