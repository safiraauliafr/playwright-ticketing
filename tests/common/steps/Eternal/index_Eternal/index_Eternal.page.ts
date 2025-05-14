import { Page , expect} from '@playwright/test';

export class IndexEternal {
    private page: Page;    

    constructor(page: Page) {
        this.page = page;
    }

    locators = {
        a_LinkToTicket:(carplate:string)=>`//tr[.//div[text()="${carplate}"]]//a[starts-with(@href,"/tickets/")]`,

    }

    async Click_LinkToTicket(carplate:string){
        
        await this.page.locator(this.locators.a_LinkToTicket(carplate)).click();
    }

}