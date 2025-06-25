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

    async switchToTabByUrl(targetUrl: string): Promise<Page> {
        const pages = this.page.context().pages();
    
        for (const page of pages) {
            await page.waitForLoadState();
            const currentUrl = page.url();
    
            if (currentUrl.includes(targetUrl)) {
                this.page = page;
            }
        }
    
        throw new Error(`No page found with URL matching: ${targetUrl}`);
    }

    async switchToTabByTitle(title: string) {
        const pages = this.page.context().pages();
        for (const page of pages) {
            await page.waitForLoadState();
            const title = await page.title();
            if (title.includes(title)) {
                this.page = page;
                return;
            }
        }
        throw new Error(`No page found with title matching: ${title}`);
    }

    async closeTabByTitle(targetTitle: string) {
        const pages = this.page.context().pages();
        for (const page of pages) {
            await page.waitForLoadState();
            const title = await page.title();
            if (title.includes(targetTitle)) {
                await page.close();
                return;
            }
        }
        throw new Error(`No tab found with title matching: ${targetTitle}`);
    }
}