import { Page, expect } from '@playwright/test';
import { NavCaptainPage } from './nav_captain.page';


export class NavCaptainStep {
    private page: Page;
    private Nav: NavCaptainPage;
    

    constructor(page: Page) {
        this.Nav = new NavCaptainPage(page);
        this.page = page;
    }

    async NavToTickets(){
        await this.Nav.click_liNav('Ticket Management');
        await this.Nav.click_aNav('Tickets');
        await this.page.waitForLoadState('networkidle');
    }

}