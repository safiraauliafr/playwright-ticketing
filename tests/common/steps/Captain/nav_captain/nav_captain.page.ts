import { Page , expect} from '@playwright/test';

export class NavCaptainPage {
    private page: Page;    

    constructor(page: Page) {
        this.page = page;
    }
    
    async click_liNav(nav:string){
        await this.page.locator(`//li[@role="menuitem" and .="${nav}"]`).click();
    }

    async click_aNav(nav:string){
        await this.page.locator(`//li[@role="menuitem"]//a[.="${nav}"]`).click();
    }


}