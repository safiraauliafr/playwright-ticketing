import { Page, expect } from '@playwright/test';

export class BrowserUtils {
    private page: Page;    

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToUrl(url: string){
        await this.page.goto(url);
    }

    async refreshPage(){
        await this.page.reload();
    }

    async goBack(){
        await this.page.goBack();
    }

    async goForward(){
        await this.page.goForward();
    }
}