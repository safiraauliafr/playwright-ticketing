import { Page } from '@playwright/test';
import { config } from '@config';
import { BasePage } from '@basepage';

export class SideBarEternalPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    async ClickCaptainLogo(){
        const captainLogo = '//header/a';
        await this.page.hover(captainLogo);
        await this.page.waitForTimeout(3000);

        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.click(captainLogo) // Triggers opening the new tab
        ]);

        await newPage.waitForLoadState('load');
        const newPageUrl = newPage.url();
        if (!newPageUrl.includes(config.domains.captain.baseUrl)) {
            throw new Error(`Expected new tab to have URL containing '${config.domains.captain.baseUrl}', but got '${newPageUrl}'`);
        }
    }
}