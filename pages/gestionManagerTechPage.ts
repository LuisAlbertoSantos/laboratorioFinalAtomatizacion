import { Locator, Page } from "@playwright/test";

export class gestionManagerTechPage {

    private readonly gestionButton: Locator;
    private readonly inicioButton: Locator;
    private readonly newProductTexBox: Locator;
    private readonly newProductCategoryTexBox: Locator;
    private readonly newProductPriceTexBox: Locator;
    private readonly createProductButton: Locator;
    private readonly deleteProductButton: Locator;


    constructor(page: Page) { 
        this.gestionButton = page.locator('[data-testid="nav-manage"]');
        this.inicioButton = page.locator('[data-testid="nav-home"]');
        this.newProductTexBox = page.locator('[data-testid="new-product-name"]');
        this.newProductCategoryTexBox = page.locator('[data-testid="new-product-category"]');
        this.newProductPriceTexBox = page.locator('[data-testid="new-product-price"]');
        this.createProductButton = page.locator('[data-testid="create-product-button"]');
        this.deleteProductButton = page.locator('.manage-item');
    }

    async clickGestionButton(){
        await this.gestionButton.click();
    }

    async clickInicioButton(){
        await this.inicioButton.click();
    }

    async fillNewProductName(product: string){
        await this.newProductTexBox.fill(product);
    }

    async fillNewProductCategory(category: string){
        await this.newProductCategoryTexBox.fill(category);
    }

    async fillNewProductPrice(price: string){
        await this.newProductPriceTexBox.fill(price);
    }

    async clickCreateProductButton(){
        await this.createProductButton.click();
    }

    async clickDeleteProductButton(productName: string){
        const deleteButton = this.deleteProductButton.filter({ hasText: productName });
        await deleteButton.locator('.remove-btn').click();
    }
}