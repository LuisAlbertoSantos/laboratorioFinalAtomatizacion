import { Locator, Page } from "@playwright/test";
import { url } from "inspector";

export class loginTechPage {
    readonly page: Page;
    private readonly userTexBox: Locator;
    private readonly passwordTexBox: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) { 

        this.page = page;
        this.userTexBox = page.locator('[data-testid="username-input"]');
        this.passwordTexBox = page.locator('[data-testid="password-input"]');
        this.loginButton = page.locator('[data-testid="login-button"]');
    }
    async siteTest(url?: string) {
    // Si 'url' viene undefined, tomará la URL por defecto entre comillas
    const targetUrl = url || process.env.BASE_URL || 'https://techstore-demo-05ad.onrender.com';
     await this.page.goto(targetUrl);
    }
    async loguear(username: string='', password: string=''){
        await this.userTexBox.fill(username);
        await this.passwordTexBox.fill(password);
        await this.loginButton.click();
    }
    async fillUser(username: string){
        await this.userTexBox.fill(username);
    }

    async fillPassword(password: string){
        await this.passwordTexBox.fill(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }
}

export const USUARIOS = {
  adminUser: 'admin',
  managerUser: 'manager',
  customerUser: 'customer',
  userInexistente: 'usuario_inexistente'
} as const;

export const PASSWORD ={
    adminPass: 'admin123',
    managerPass: 'manager123',
    customerPass: 'customer123',
    AdminPassIncorrecta: 'clave_incorrecta'
}