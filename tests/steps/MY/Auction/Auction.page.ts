import { Page , expect} from '@playwright/test';
import { config } from '@config';
import { BasePage } from '@basepage';
import {formatDate} from '@common/utils/date-utils';
import { time } from 'console';

/**
 * This class is for all page objects related to Web Inspection index & report pages
 */

export class AuctionPage  extends BasePage {
    constructor(page: Page) {
        super(page);       
    }

    //Index Page   
    async verifyPageTitle_Auction(){
        await expect(this.page.locator('//p[.="Auctions"]')).toBeVisible();
    }

    async SearchAuctionByCarplate(tabName:string, carplate:string){
        const searchInput = this.page.locator(`(//input[@data-translation-key="core.dataList.search_placeholder"])[1]`);
        const tab = this.page.locator(`//div[@role="tab" and normalize-space()="${tabName}"]`);

        await tab.waitFor({ state: 'visible' });
        await tab.click();
        await searchInput.waitFor({ state: 'visible' });
        await searchInput.scrollIntoViewIfNeeded();
        await searchInput.click();
        await searchInput.fill(carplate);
        await this.page.waitForTimeout(1000);
        await this.page.locator('(//i[@aria-label="icon: search"])[1]').click();
        await this.page.waitForTimeout(3000); 

        //Get Auction ID
        const fullText = await this.page.locator('//div[contains(@class, "text-label") and contains(text(), "ID")]').textContent();
        const idNumber = fullText?.match(/\d+/)?.[0]; 
        if (!idNumber) throw new Error('❌ ID number not found!');
        console.log('Extracted ID:', idNumber);

        const url = `https://ws-web-eks.getcars.dev/auctions/${idNumber}`; // relative path
        await this.page.goto(url);
        await this.page.waitForLoadState(); // optional, ensures page is fully loaded

    }

    // Auction.page.ts
    async ClickLinkToAuctionDetails(){
        
        await this.page.locator(`//a[starts-with(@href,"/auctions/")]//div[contains(@class, "title-value")]`).click();
        await this.page.waitForLoadState('networkidle',{timeout:50000});
    }

    async ClickBtnAuction(keyValue: string){
        const btnAuction = this.page.locator(`//button[@data-translation-key="${keyValue}"]`)
        await btnAuction.waitFor({ state: 'visible' });
        await btnAuction.click();

}
    async ClickAuctionTab(keyValue:string){
        const auctionTab = this.page.locator(`//span[@data-translation-key="${keyValue}"]`);
        await auctionTab.waitFor({ state: 'visible' });
        await auctionTab.click();
    }

    async SelectById(id:string){
        const selectById = this.page.locator(`//div[@id="${id}"]`);
        await selectById.waitFor({ state: 'visible' });
        await selectById.click();        
    }

    async SelectListActive(){
        const listActive = this.page.locator(`//li[contains(@class, "menu-item-active")]`)
        await listActive.waitFor({ state: 'visible' })
        await listActive.click();        
    }

    async ClickAwardBtn(){
        const awardBtn = this.page.locator(`//button[contains(@class, "HighestBidForAuction")]`);
        const okBtn = this.page.locator(`//button//span[text()="OK"]`);

        await awardBtn.waitFor({ state: 'visible' });
        await awardBtn.click();
        await okBtn.waitFor({ state: 'visible' });
        await okBtn.click();
        
    }

    async InputById(id:string, value:string){
        const inputById = this.page.locator(`//input[@id="${id}"]`)
        await inputById.waitFor({ state: 'visible' });
        await inputById.click();
        await inputById.fill(value);        
    }

    async getTitleByObj(locator:string){
        const title = await this.page.locator(locator).getAttribute('title') || ''; //could be null
        return title;
    }

    async SelectApptDateAuction_Today(keyValue:string){
        const date = this.page.locator(`//span[@id="${keyValue}"]`);
        const dateToday = this.page.locator(`//td[contains(@class,"ant-calendar-selected-day")]`);

        await date.waitFor({ state: 'visible' });
        await date.click();
        await dateToday.waitFor({ state: 'visible' });
        await dateToday.click();
        
            // //date format is MMMM d, yyyy
            // const strToday = await this.getTitleByObj('//td[contains(@class,"ant-calendar-selected-day")]');
            // const dateToday = new Date(strToday);  
            // //Add one day
            // const dateTomorrow = new Date(dateToday);
            // dateTomorrow.setDate(dateToday.getDate() + 1);
            // const strTomorrow = formatDate(dateTomorrow, 'MMMM d, yyyy');
            // console.log('strTomorrow: ' + strTomorrow);
            // await this.page.locator(`//td[@title="${strTomorrow}"]`).click();   
        }

        async SelectAuctionSession(){
            const auction_session = this.page.locator(`//div[@id="auction_session"]`);

            await auction_session.waitFor({ state: 'visible' });
            await auction_session.click();
            
            await this.page.locator(`(//ul[contains(@class, 'ant-select-dropdown-menu')]//li[@class="ant-select-dropdown-menu-item"])[1]`).click();  
            await this.page.locator(`//button//span[text()="OK"]`).click();      
    }

        async VerifyAuctionStatus(status:string, page: Page = this.page){
        await expect(this.page.locator(`(//div[@type="status"]//span[@class="ant-tag"])[1]`)).toHaveText(status);
    }

    async VerifyAuctionStatusEnded(keyValue: string): Promise<Page> {
        const [newPage] = await Promise.all([

        this.page.context().waitForEvent('page'),
        await expect(this.page.locator(`(//div[@type="status"]//span[@class="ant-tag"])[1]`)).toHaveText(status),
    ]);
        await newPage.waitForLoadState();
        return newPage; // 👈 return new tab
}

    async GetAuctionId(status:string){
        await expect(this.page.locator(`(//div[@type="status"]//span[@class="ant-tag"])[1]`)).toHaveText(status);
    }

    async getAuctionIdFromBreadcrumb(): Promise<string> {
        const id = await this.page.textContent('.Breadcrumbs__BreadcrumbLink-sc-bhi9m8-0.lj1wwl');
        return id?.trim() || '';
    }
    /*
        To input value to input field by field name
    */
   async inputByFieldName(fieldName:string, value:string){
    await this.page.locator(`//div[@class="inspection-control" and .//*[text()="${fieldName}"]]//input`).fill(value);

   }

     

    

}