import { Page , expect} from '@playwright/test';
import { BasePage } from '@basepage';

export class NavCaptainPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }
    
    async click_liNav(nav:string){
        await this.page.locator(`//li[@role="menuitem" and .="${nav}"]`).click();
    }

    async click_aNav(nav:string){
        await this.page.locator(`//li[@role="menuitem"]//a[.="${nav}"]`).click();
    }


}