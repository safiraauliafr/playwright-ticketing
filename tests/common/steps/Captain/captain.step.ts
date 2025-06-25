import { Page, expect } from '@playwright/test';
import { NavCaptainPage } from './pages/nav_captain.page';
import { BrowserUtils } from '@utils/browser-utils'
import { config } from '@config';


export class CaptainStep {
    private page: Page;
    private Nav: NavCaptainPage;
    private browser: BrowserUtils;
    

    constructor(page: Page) {
        this.Nav = new NavCaptainPage(page);
        this.page = page;
        this.browser = new BrowserUtils(page);
    }

    //Navigate To
    async NavToTickets(){
        await this.Nav.click_liNav('Ticket Management');
        await this.Nav.click_aNav('Tickets');
        await this.browser.waitForPageLoad();
    }

    async NavToWebInspection(){
        await this.Nav.click_aNav('Web Inspection');
        await this.browser.waitForPageLoad();
    }

    async NavToCaptainByUrl(){
        await this.page.goto(config.domains.captain.baseUrl);
        await this.browser.waitForPageLoad();
    }

}