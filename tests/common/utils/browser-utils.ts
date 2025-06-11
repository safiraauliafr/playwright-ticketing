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

    async waitForPageLoad(timeout?:number){
        await this.page.waitForLoadState('load',{timeout:timeout || 30000});
    }

    async scrollToTop(){
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
          });
    }
}