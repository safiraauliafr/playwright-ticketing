import { Page , expect} from '@playwright/test';

export class NavCaptainPage {
    private page: Page;    

    constructor(page: Page) {
        this.page = page;
    }

    //locators
    locators = { 
        //dynamic locators
        li_nav:(variable:string) => `//li[@role="menuitem" and .="${variable}"]`,
        a_nav:(variable:string) => `//li[@role="menuitem"]//a[.="${variable}"]`,
        
    }


    async click_liNav(nav:string){
        await this.page.locator(this.locators.li_nav(nav)).click();
    }

    async click_aNav(nav:string){
        await this.page.locator(this.locators.a_nav(nav)).click();
    }


}