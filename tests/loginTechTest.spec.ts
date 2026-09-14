import { test, expect } from '@playwright/test';
import { loginTechPage, PASSWORD, USUARIOS } from '../pages/loginTechPage';
import process from 'process';

test('TC-001 — LOGIN CORRECTO COMO ADMIN', async ({ page }) => {

  const loginPage = new loginTechPage(page); 
  await loginPage.siteTest();
  await loginPage.loguear(USUARIOS.adminUser, PASSWORD.adminPass);

  await expect(page.locator('[data-testid="current-role"]')).toHaveText('admin');

  //await page.getByTestId('[data-testid="current-role"]').click();
});

test('TC-002 — LOGIN CORRECTO COMO MANAGER', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);

  const loginPage = new loginTechPage(page); 
  await loginPage.siteTest();
  await loginPage.loguear(USUARIOS.managerUser, PASSWORD.managerPass);

  await expect(page.locator('[data-testid="current-role"]')).toHaveText('manager');

  //await page.getByTestId('[data-testid="current-role"]').click();
});

test('TC-003 — LOGIN CORRECTO COMO CUSTOMER', async ({ page }) => {

  const loginPage = new loginTechPage(page); 
  await loginPage.siteTest();
  await loginPage.loguear(USUARIOS.customerUser, PASSWORD.customerPass);

  await expect(page.locator('[data-testid="current-role"]')).toHaveText('customer'); 
});

test('TC-004 — CONTRASEÑA INCORRECTA', async ({ page }) => {

  const loginPage = new loginTechPage(page); 
  await loginPage.siteTest();
  await loginPage.loguear(USUARIOS.adminUser, PASSWORD.AdminPassIncorrecta);

  await expect(page.locator('[data-testid="login-error"]')).toHaveText('Credenciales inválidas');

  //await page.getByTestId('[data-testid="current-role"]').click();
});

test('TC-005 — ADMIN - USUARIO INEXISTENTE', async ({ page }) => {

  const loginPage = new loginTechPage(page);
  await loginPage.siteTest();
  await loginPage.loguear(USUARIOS.userInexistente, PASSWORD.adminPass);

  await expect(page.locator('[data-testid="login-error"]')).toHaveText('Credenciales inválidas');

  //await page.getByTestId('[data-testid="current-role"]').click();
});

test('TC-006 — CAMPOS VACIOS', async ({ page }) => {

  const loginPage = new loginTechPage(page); 
  await loginPage.siteTest();
  await loginPage.loguear('', '');

  await expect(page.locator('[data-testid="login-error"]')).toHaveText('username y password son obligatorios');

  //await page.getByTestId('[data-testid="current-role"]').click();
});


 