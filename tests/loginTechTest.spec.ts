import { test, expect } from '@playwright/test';
import { loginTechPage } from '../pages/loginTechPage';
import process from 'process';

test('TC-001 — LOGIN CORRECTO COMO ADMIN', async ({ page }) => {

  const loginPage = new loginTechPage(page); 
  await loginPage.siteTest();
  await loginPage.loguear(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);

  await expect(page.locator('[data-testid="current-role"]')).toHaveText('admin');

  //await page.getByTestId('[data-testid="current-role"]').click();
});

test('TC-002 — LOGIN CORRECTO COMO MANAGER', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);

  const loginPage = new loginTechPage(page); 
  await loginPage.siteTest();
  await loginPage.loguear(process.env.MANAGER_USER!, process.env.MANAGER_PASS!);

  await expect(page.locator('[data-testid="current-role"]')).toHaveText('manager');

  //await page.getByTestId('[data-testid="current-role"]').click();
});

test('TC-003 — LOGIN CORRECTO COMO CUSTOMER', async ({ page }) => {

  const loginPage = new loginTechPage(page); 
  await loginPage.siteTest();
  await loginPage.loguear(process.env.CUSTOMER_USER!, process.env.CUSTOMER_PASS!);

  await expect(page.locator('[data-testid="current-role"]')).toHaveText('customer');
});

test('TC-004 — CONTRASEÑA INCORRECTA', async ({ page }) => {

  const loginPage = new loginTechPage(page); 
  await loginPage.siteTest();
  await loginPage.loguear(process.env.ADMIN_USER!, process.env.ADMIN_PASS_INCORRECTA! || 'clave_incorrecta');

  await expect(page.locator('[data-testid="login-error"]')).toHaveText('Credenciales inválidas');

  //await page.getByTestId('[data-testid="current-role"]').click();
});

test('TC-005 — ADMIN - USUARIO INEXISTENTE', async ({ page }) => {

  const loginPage = new loginTechPage(page);
  await loginPage.siteTest();
  await loginPage.loguear(process.env.USER_INEXISTENTE!, process.env.ADMIN_PASS!);

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


 