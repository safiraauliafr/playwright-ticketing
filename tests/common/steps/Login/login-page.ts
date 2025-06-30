import { Page , expect} from '@playwright/test';
import { BasePage } from '@basepage';

export class LoginPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    async clickLoginWith() {
        const btn_LoginWith= '//button[.="Login with"]';
        await expect(this.page.locator(btn_LoginWith)).toBeVisible({timeout: 10000});
        await this.page.click(btn_LoginWith);
    }

    async enterEmail(email: string) {
        await this.page.fill('//input[@name="email"]', email);
    }

    async enterPassword(password: string) {
        await this.page.fill('//input[@name="password"]', password);
    }

    async clickLogin() {
        await this.page.click('//button[.="Log in"]');
        await expect(this.page.locator('//h3[text()="Welcome back !"]')).toBeVisible({timeout: 7000});
        await expect(this.page.locator('//div[text()="Successfully logged in"]')).not.toBeVisible({timeout: 15000});
    }
    
}