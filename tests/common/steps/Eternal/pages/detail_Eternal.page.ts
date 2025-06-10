import { Page } from '@playwright/test';

export class DetailEternalPage {
    private page: Page;    

    constructor(page: Page) {
        this.page = page;
    }

    async Click_BackToOverview(){  
        
        const isVisible = await this.page.getByText('Back to overview').isVisible({timeout:10000});
        if(isVisible){
            await this.page.getByText('Back to overview').click();
            await this.page.waitForLoadState('networkidle',{timeout:20000});
            await this.page.getByText('Overview').first().waitFor({state:'visible'});
        }else {
            console.log('"Back to overview" not visible — skipping click.');
        }
        
    }
}