import { Page , expect} from '@playwright/test';

export class IndexEternal {
    private page: Page;    

    constructor(page: Page) {
        this.page = page;
    }

    async Click_LinkToTicket(carplate:string){        
        await this.page.locator(`//tr[.//div[text()="${carplate}"]]//a[starts-with(@href,"/tickets/")]`).click();
    }

}