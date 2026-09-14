// tests/loginApi.spec.ts
import { test, expect } from '@playwright/test';
import { ApiLoginTech } from '../pages/ApiLoginTech';
import process from 'process';
import 'dotenv/config';
import { PASSWORD, USUARIOS } from '../pages/loginTechPage';

test.describe('API Testing login', () => {
  let LoguearApi: ApiLoginTech;

  test.beforeEach(async ({ request }) => {
    // Inicializamos la clase POM pasando el contexto de API de Playwright
    LoguearApi = new ApiLoginTech(request);
  });

  test('TC-001-API: LOGIN CORRECTO COMO ADMIN', async () => {
    // Ejecutar login
    const response = await LoguearApi.login({
      username: USUARIOS.adminUser,
      password: PASSWORD.adminPass
    });
    // Validaciones
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

    test('TC-002-API: LOGIN CORRECTO COMO MANAGER', async () => {
    // Ejecutar login
    const response = await LoguearApi.login({
      username: USUARIOS.managerUser,
      password: PASSWORD.managerPass
    });
    // Validaciones
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('TC-003-API: LOGIN CORRECTO COMO CUSTOMER', async () => {
    // Ejecutar login
    const response = await LoguearApi.login({
      username: USUARIOS.customerUser,
      password: PASSWORD.customerPass
    });
    // Validaciones
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('TC-004-API: LOGIN FALLIDO CON CREDENCIALES INCORRECTAS', async () => {
    // Ejecutar login con datos erróneos
    const response = await LoguearApi.login({
      username: 'admin',
      password: 'clave_incorrecta'
    });

    // Validar status de error
    expect(response.status()).toBe(401);
  });
  
  test('TC-005-API: LOGIN ADMIN CON USUARIO INEXISTENTE Y PASSWORD CORRECTO', async () => {
    // Ejecutar login con usuario inexistente
    const response = await LoguearApi.login({
      username: USUARIOS.userInexistente,
      password: PASSWORD.adminPass
    });
    // Validar status de error
    expect(response.status()).toBe(401);
  });

  test('TC-006-API: LOGIN CON CAMPOS VACIOS', async () => {
    // Ejecutar login con campos vacíos
    const response = await LoguearApi.login({
      username: '',
      password: ''
    });
    // Validar status de error
    expect(response.status()).toBe(400);
  }); 
});