import { Page , expect} from '@playwright/test'
import { BrowserUtils } from '@utils/browser-utils'
import { config } from '@config'
import { LoginStep } from '@common/steps/Login/login-steps'

export class QuotationPage {
    private browserUtils: BrowserUtils
    private Login: LoginStep
    private page: Page
    
    constructor(page: Page) {
        this.browserUtils = new BrowserUtils(page)
        this.Login = new LoginStep(page)
        this.page = page
    }

    obj = {
        record:(carplate:string)=>`//tr[contains(.,"${carplate}")]`,
        price:(value:string)=>`//*[contains(@class,"item-view-only") and contains(.,"${value}")]//div[2]`,
        HistoricalPrice:(value:string)=>`//*[@class="historical-prices"]//tr[contains(.,"${value}")]//td[contains(.,"RM")]`,
    }

    async NavTo_QuotationPage() {
        await this.browserUtils.navigateToUrl(config.domains.quotation.baseUrl)
        await this.page.waitForTimeout(1000)
        await this.Login.CheckIfLoginNeeded()
        await expect(this.page.getByRole('tab', { name: 'To Quote'})).toBeVisible({ timeout: 10000 })
    }

    async Select_TabName(tab:string) {
        await this.page.waitForTimeout(1000)
        await this.page.getByRole('tab',{ name: `${tab}`}).click()
        await this.page.waitForTimeout(2000)
    }

    async Search_ByCarplate(carplate:string) {
        await this.page.getByPlaceholder('Search a carplate').fill(carplate)
        await this.page.getByRole('button', { name: 'search' }).click()
        await this.page.waitForTimeout(2000)
        await expect(this.page.locator(this.obj.record(carplate))).toBeVisible({timeout:30000})
    }

    async RemoveSearch() {
        await this.page.getByPlaceholder('Search a carplate').click()
        await this.page.click('//*[@aria-label="close-circle"]')
        await this.page.waitForTimeout(1000)
        await expect(this.page.getByPlaceholder('Search a carplate')).toHaveAttribute('value', '')
    }

    async Verify_QuotationStatus(carplate:string, status:string){
        await expect(this.page.locator(this.obj.record(carplate) + '//td[3]//*[@class="status"]')).toHaveText(status)
    }

    async Verify_QuotationInspectionStatus(carplate:string, status:string){
        await expect(this.page.locator(this.obj.record(carplate) + '//td[5]//*[@class="status"]')).toHaveText(status)
    }

    async Click_ActionButton(carplate:string) {
        await this.page.click(this.obj.record(carplate) + '//*[@aria-label="eye"]/../..//button')
        await expect(this.page.getByText('Manual Wholesale Price')).toBeVisible({ timeout: 30000 })
    }

    async Verify_Empty_ManualValuation(priceFor:string) {
        await expect(this.page.locator(this.obj.price(priceFor))).toHaveText('-')
    }

    async Verify_UserExpectedPrice(targetPrice:string) {
        await expect(this.page.locator(this.obj.HistoricalPrice("User Expected Price"))).toHaveText(targetPrice)
    }

    async Exit_Drawer() {
        await this.page.getByRole('tab', { name: 'To Quote'}).click({ force: true })
        await this.page.waitForTimeout(1000)
    }

    async Submit_OfferPrice(carplate:string) {
        await this.page.click('//*[@class="header" and contains(.,"Manual Valuation")]//*[@aria-label="edit"]')
        await this.page.locator('#estimated_recon_cost').isVisible({ timeout: 5000 })
        await this.page.fill('#estimated_recon_cost','0')
        await this.page.fill('#estimated_retail_price','0')
        await this.page.fill('#manual_wholesale_price','50000')
        await this.page.fill('#manual_offer_price','40000')
        await this.page.waitForTimeout(1000)
        await this.page.click('//*[contains(@class,"ant-drawer-open")]//button[.="Save"]')
        await expect(this.page.locator('//*[contains(@class,"ant-drawer-open")]//button[.="Save"]')).toBeHidden({ timeout: 15000 })
        await expect(this.page.locator('//*[text()="Successful"]')).toBeVisible({ timeout: 15000 })
        await expect(this.page.locator('//*[text()="An offer price has been successfully submitted."]')).toBeVisible({ timeout: 15000 })
        await expect(this.page.locator(this.obj.HistoricalPrice("Offer Price Submitted"))).toHaveText('RM 40,000')
        await this.Exit_Drawer()
        await this.NavTo_QuotationPage()
        await this.Select_TabName("Quoted")
        await this.Search_ByCarplate(carplate)
    }

    async Reject_OfferPrice(carplate:string) {
        await this.Click_ActionButton(carplate)
        await this.page.click('//*[@class="historical-prices-body-content"]//*[@aria-label="edit"]')
        await this.page.getByRole('button', { name: 'Accept' }).isVisible({ timeout: 5000 })
        await this.page.getByRole('button', { name: 'Reject' }).click()
        await this.page.locator('#basePrice').click({ clickCount: 3 })
        await this.page.keyboard.press('Delete')
        await this.page.locator('#basePrice').fill('50000')
        await this.page.waitForTimeout(1000)
        await this.page.locator('#targetPrice').click({ clickCount: 3 })
        await this.page.keyboard.press('Delete')
        await this.page.locator('#targetPrice').fill('60000')
        await this.page.waitForTimeout(1000)
        await this.page.click('//*[@class="ant-popover-content"]//button[@type="submit"]')
        await this.page.locator('//*[@class="ant-popover-content"]//button[@type="submit"]').isHidden({ timeout: 5000 })
        await this.Exit_Drawer()
        await this.NavTo_QuotationPage()
        await this.Select_TabName("Auction")
        await this.Search_ByCarplate(carplate)
        await this.Click_ActionButton(carplate)
        await expect(this.page.locator(this.obj.HistoricalPrice("Rejected"))).toBeVisible({ timeout: 5000 })
        await this.Exit_Drawer()
    }

    async Accept_OfferPrice(carplate:string){
        const editBtn = '//table[.//*[text()="Offer Price Submitted"]]//span[@aria-label="edit"]';        
        await this.Click_ActionButton(carplate)
        await expect(this.page.locator(editBtn)).toBeEnabled();
        const offerPrice = await this.page.locator('//table[.//*[text()="Offer Price Submitted"]]//*[contains(text(),"RM")]').textContent();
        await this.page.locator(editBtn).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('//button[.="Accept"]').click();
        await this.page.locator('//table[.//*[text()="Accepted"]]').waitFor({state: 'visible'});
        await expect(this.page.locator(`//table[.//*[text()="Accepted"]]//*[contains(text(),"${offerPrice}")]`)).toBeVisible();
        await this.page.waitForTimeout(2000);
        await this.Exit_Drawer()
        await this.NavTo_QuotationPage()
        await this.Select_TabName("Accepted")
        await this.Search_ByCarplate(carplate)
        await this.Click_ActionButton(carplate)
        await expect(this.page.locator(this.obj.HistoricalPrice("Accepted"))).toBeVisible({ timeout: 5000 })
        await this.Exit_Drawer()
    }

}