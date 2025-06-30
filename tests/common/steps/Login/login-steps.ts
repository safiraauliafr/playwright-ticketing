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
    }

    async LoginSSO(email: string, password: string) {
        await this.loginPage.clickLoginWith();
        await this.loginPage.enterEmail(email);
        await this.loginPage.enterPassword(password);
        await this.loginPage.clickLogin();
    }

    async CheckIfLoginNeeded() {
        if (await this.page.locator('//button[contains(.,"Login with")]').count() > 0) {
            await this.page.locator('//button[contains(.,"Login with")]').click()
            await this.page.waitForTimeout(2000)
            await this.loginPage.enterEmail(config.auth.captain.email)
            await this.loginPage.enterPassword(config.auth.captain.password)
            await this.loginPage.clickLogin()
        }
    }

    async LoginDealer(){
        await this.browserUtils.navigateToUrl(config.domains.dealer.baseUrl);
        await this.LoginSSO(config.auth.dealer.email,config.auth.dealer.password);
    }

    async SSO_ExistingAccount(email: string, password: string) {
        await this.loginPage.clickLoginWith();
        
        const loginExistingAcc = this.page.locator('//p[@data-testid="username"]')
        await loginExistingAcc.waitFor({ state: 'visible', timeout: 2000 })
        const isVisible = await loginExistingAcc.isVisible();
        if (isVisible) {
            await loginExistingAcc.click();
            return;
        }         
    
        await this.loginPage.enterEmail(email);
        await this.loginPage.enterPassword(password);
        await this.loginPage.clickLogin();
    }

    async LoginExistingAccountSSO() {
        await this.browserUtils.navigateToUrl(config.domains.captain.baseUrl);
        await this.SSO_ExistingAccount(config.auth.captain.email,config.auth.captain.password);
    }
}