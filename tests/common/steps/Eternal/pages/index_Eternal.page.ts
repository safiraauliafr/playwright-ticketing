import { Page } from '@playwright/test';
import { BasePage } from '@basepage';

export class IndexEternalPage extends BasePage{   

    constructor(page: Page) {
        super(page);
    }

    async Click_LinkToTicket(carplate:string){        
        await this.page.locator(`//tr[.//div[text()="${carplate}"]]//a[starts-with(@href,"/tickets/")]`).click();
        await this.page.waitForLoadState('networkidle',{timeout:20000});
    }

}