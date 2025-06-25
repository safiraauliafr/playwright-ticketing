import { Page } from '@playwright/test';

export abstract class BasePage {
    protected page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    withPage(newPage: Page): this {
        const NewClass = this.constructor as new (page: Page) => this;
        return new NewClass(newPage);
    }
}