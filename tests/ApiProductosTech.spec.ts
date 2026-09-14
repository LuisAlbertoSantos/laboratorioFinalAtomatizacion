import { test, expect } from "@playwright/test";
import { AuthService } from "../api/AuthService";
import { ProductService, ProductPayload, ProductResponse } from "../api/ProductService";

const BASE_URL = "https://techstore-demo-05ad.onrender.com";

test.describe("API CRUD Testing con POM - TechStore (TypeScript)", () => {
  let authToken: string;
  let authService: AuthService;
  let productService: ProductService;
  let createdProductId: string;

  test.beforeAll(async () => {
    authService = new AuthService(undefined, BASE_URL);
    productService = new ProductService(BASE_URL);

    authToken = await authService.getToken("admin", "admin123");
  });

  test("Debería realizar el ciclo CRUD completo de un producto", async ({ request }) => {
    
    // 1. CREATE (POST)
    const nuevoProducto: ProductPayload = {
      name: "Monitor Gamer ttttttTest",
      price: 290.00,
      description: "Monitor de prueba para API",
      category: "Monitores",
      stock: 5,
      freeShipping: true,
      originalPrice: 300.00,
      rating: 5,
      seller: "TechStore Official"
    };

    const createResponse = await productService.createProduct(request, nuevoProducto, authToken);
    expect(createResponse.status()).toBe(201);

    const createdBody = (await createResponse.json()) as ProductResponse;
    createdProductId = createdBody.id; // Guardamos el ID para usarlo en los siguientes pasos
    expect(createdProductId).toBeTruthy();


    // 2. READ / GET (Consultar el producto creado)
    const getResponse = await productService.getProductById(request, createdProductId);
    expect(getResponse.status()).toBe(200);

    const getBody = (await getResponse.json()) as ProductResponse;
    expect(getBody.name).toBe(nuevoProducto.name);


    // 3. UPDATE / PUT (Actualizar el precio o nombre del producto)
    const datosActualizados = {
      price: 220.00,
      name: "Monitor Gamer Actualizado"
    };

    const updateResponse = await productService.updateProduct(request, createdProductId, datosActualizados, authToken);
    expect(updateResponse.status()).toBe(200); // O 204 dependiendo de cómo responda tu API al actualizar

    const updateBody = (await updateResponse.json()) as ProductResponse;
    expect(updateBody.price).toBe(220.00);
    expect(updateBody.name).toBe("Monitor Gamer Actualizado");


    // 4. DELETE (Eliminar el producto)
    const deleteResponse = await productService.deleteProduct(request, createdProductId, authToken);
    expect([200, 204]).toContain(deleteResponse.status()); // Comprobamos éxito (200 OK o 204 No Content)


    // 5. VALIDAR QUE YA NO EXISTE (GET posterior al DELETE)
    const verifyDeleteResponse = await productService.getProductById(request, createdProductId);
    expect(verifyDeleteResponse.status()).toBe(404); // Debería dar Not Found
  });
});