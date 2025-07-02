import { Page , expect} from '@playwright/test';
import { BasePage } from '@basepage';

export class TicketIndexPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    locators = {
        obj_TicketRecord:(carplate:string,objValue:string)=>`//tr[.//div[text()="${carplate}"]]//*[text()="${objValue}"]`,
        empty_TicketRecord:(carplate:string,tdnum:string)=>`//tr[.//div[text()="${carplate}"]]//td[${tdnum}]//*[text()="-"]`,
    }

    async FilterBySellerType(sellerType:string){
        await this.page.locator('//button[.="Filter"]').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('//div[@class="ant-select-selector" and .//input[@id="sellerType"]]').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//*[@title="${sellerType}"]`).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('//button[.="Done"]').click();
        await this.page.waitForTimeout(1000);
    }

    async ClearFilter(){
        await this.page.locator('//span[@class="anticon anticon-close ant-tag-close-icon"]').click();
        await this.page.waitForTimeout(1000);
    }

    async ClickLinkToTicketDetails(carplate:string){
        await this.page.locator(`//tr[.//div[text()="${carplate}"]]//a[starts-with(@href,"/tickets/")]`).click();
        await this.page.waitForLoadState('networkidle',{timeout:20000});
    }

    async Verify_TicketPresent(carplate:string){
        const ticketRecord = `//tr[.//div[text()="${carplate}"]]//a[starts-with(@href,"/tickets/")]`
        await this.page.locator(ticketRecord).waitFor({state:'visible'});
        await this.page.locator(ticketRecord).isEnabled();        
    }

    async Verify_TicketOwnerName(carplate:string,name:string){
        await expect(this.page.locator(this.locators.obj_TicketRecord(carplate,name))).toBeVisible();
    }

    async Verify_SellerType(carplate:string,type:string){
        await expect(this.page.locator(this.locators.obj_TicketRecord(carplate,type))).toBeVisible();
    }

    async Verify_GroupName(carplate:string, groupName:string){
        await expect(this.page.locator(this.locators.obj_TicketRecord(carplate,groupName))).toBeVisible();
    }

    async Verify_TicketType(carplate:string, ticketType:string){
        await expect(this.page.locator(this.locators.obj_TicketRecord(carplate,ticketType))).toBeVisible();
    }

    async Verify_TicketStatus(carplate:string,status:string){
        await expect(this.page.locator(this.locators.obj_TicketRecord(carplate,status))).toBeVisible();
    }

    async Verify_AppointmentStatus(carplate:string,status:string){
        await expect(this.page.locator(this.locators.obj_TicketRecord(carplate,status))).toBeVisible();
    }

    async Verify_InspectionStatus(carplate:string,status:string){
        await expect(this.page.locator(this.locators.obj_TicketRecord(carplate,status))).toBeVisible();
    }

    async Verify_QuotationStatus(carplate:string,status:string){
        await expect(this.page.locator(`//tr[.//div[text()="${carplate}"]]//td[7]//*[@class="status"]`)).toHaveText(status);
    }

    async Verify_AuctionStatus(carplate:string,status:string){
        await expect(this.page.locator(`//tr[.//div[text()="${carplate}"]]//td[8]//*[@class="ant-space-item"][2]//*[starts-with(@class,"css-")]`)).toHaveText(status);
    }

    //Vehicle Details = Make + Model + Submodel + Year
    async Verify_VehicleDetails(carplate:string,value:string){
        await expect(this.page.locator(this.locators.obj_TicketRecord(carplate,value))).toBeVisible();
    }

    //Buy transaction status
    async Verify_BuyTransactionStatus(carplate:string,status:string){
        await expect(this.page.locator(`//tr[.//*[text()="${carplate}"] and .//*[text()="Buy"]]//*[text()="${status}"]`)).toBeVisible();
    }

    //Verify Empty
    async VerifyEmpty_Appointment(carplate:string){
        await expect(this.page.locator(this.locators.empty_TicketRecord(carplate,'5'))).toBeVisible();
    }

    async VerifyEmpty_Inspection(carplate:string){
        await expect(this.page.locator(this.locators.empty_TicketRecord(carplate,'6'))).toBeVisible();
    }

    async VerifyEmpty_Quotation(carplate:string){
        await expect(this.page.locator(this.locators.empty_TicketRecord(carplate,'7'))).toBeVisible();
    }

    async VerifyEmpty_Auction(carplate:string){
        await expect(this.page.locator(this.locators.empty_TicketRecord(carplate,'8'))).toBeVisible();
    }

    async VerifyEmpty_Transaction(carplate:string){
        await expect(this.page.locator(this.locators.empty_TicketRecord(carplate,'9'))).toBeVisible();
    }
}