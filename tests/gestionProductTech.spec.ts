import { test, expect } from '@playwright/test';
import { loginTechPage } from '../pages/loginTechPage';
import { gestionAdminTechPage } from '../pages/gestionAdminTechPage';
import { gestionManagerTechPage } from '../pages/gestionManagerTechPage';

test('TC-007 — ADMIN PUEDE CREAR PRODUCTO', async ({ page }) => {
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  const loginPage = new loginTechPage(page); 
  await loginPage.fillUser('admin');
  await loginPage.fillPassword('admin123');
  await loginPage.clickLoginButton();

  const gestionAdminPage = new gestionAdminTechPage(page);
  const productName = 'television';
  const productCategory = 'Categoría de prueba';
  const productPrice = '100';

  //console.log('Product Price Decimal:', productPriceFormatted); // Imprimir el precio formateado en la consola

  await gestionAdminPage.clickGestionButton();
  await gestionAdminPage.fillNewProductName(productName);
  await gestionAdminPage.fillNewProductCategory(productCategory);
  await gestionAdminPage.fillNewProductPrice(productPrice);
  await gestionAdminPage.clickCreateProductButton();
  await gestionAdminPage.clickInicioButton();


  await expect(page.locator('[data-testid="product-name"]').filter({ hasText: productName })).toHaveText(productName);

  //await page.getByTestId('[data-testid="current-role"]').click();
});

test('TC-009 — ADMIN PUEDE ELIMINAR PRODUCTO', async ({ page }) => {
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  const loginPage = new loginTechPage(page); 
  await loginPage.fillUser('admin');
  await loginPage.fillPassword('admin123');
  await loginPage.clickLoginButton();

  const gestionAdminPage = new gestionAdminTechPage(page);
  const productName = 'television — $300.00';

  //console.log('Product Price Decimal:', productPriceFormatted); // Imprimir el precio formateado en la consola

  await gestionAdminPage.clickGestionButton();
  await gestionAdminPage.clickDeleteProductButton(productName);

  await expect(page.locator('[data-testid="manage-list"]').filter({ hasText: productName })).toHaveCount(0);
  
});

test('TC-010 — MANAGER PUEDE CREAR PRODUCTO', async ({ page }) => {
  await page.goto('https://techstore-demo-05ad.onrender.com/');

  const loginPage = new loginTechPage(page); 
  await loginPage.fillUser('manager');
  await loginPage.fillPassword('manager123');
  await loginPage.clickLoginButton();

  const gestionManagerPage = new gestionManagerTechPage(page);
  const productName = 'parlante';
  const productCategory = 'Categoría de prueba';
  const productPrice = '120';

  //console.log('Product Price Decimal:', productPriceFormatted); // Imprimir el precio formateado en la consola

  await gestionManagerPage.clickGestionButton();
  await gestionManagerPage.fillNewProductName(productName);
  await gestionManagerPage.fillNewProductCategory(productCategory);
  await gestionManagerPage.fillNewProductPrice(productPrice);
  await gestionManagerPage.clickCreateProductButton();
  await gestionManagerPage.clickInicioButton();

  await expect(page.locator('[data-testid="product-name"]').getByText('parlante', { exact: true })).toBeVisible();
  //await page.getByTestId('[data-testid="current-role"]').click();
});



 