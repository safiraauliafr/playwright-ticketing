import { Page, expect } from '@playwright/test';
import { LoginPage } from "./login-page";
import { BrowserUtils } from '@utils/browser-utils';
import { config } from '@config';


export class LoginStep {
    private loginPage: LoginPage;
    private browserUtils: BrowserUtils;
    private page: Page;  

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.browserUtils = new BrowserUtils(page);
        this.page = page;
    }

    async LoginCaptain(){
        await this.browserUtils.navigateToUrl(config.domains.captain.baseUrl);
        await this.LoginSSO(config.auth.captain.email,config.auth.captain.password);
        await this.page.waitForTimeout(30000);
    }

    async LoginSSO(email: string, password: string) {
        await this.loginPage.clickLoginWith();
        await this.loginPage.enterEmail(email);
        await this.loginPage.enterPassword(password);
        await this.loginPage.clickLogin();
    }
}