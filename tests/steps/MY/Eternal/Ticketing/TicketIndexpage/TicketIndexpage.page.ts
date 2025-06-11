import { Page , expect} from '@playwright/test';

export class TicketIndexPage {
    private page: Page;    

    constructor(page: Page) {
        this.page = page;
    }

    locators = {
        obj_TicketRecord:(carplate:string,objValue:string)=>`//tr[.//div[text()="${carplate}"]]//*[text()="${objValue}"]`,
        empty_TicketRecord:(carplate:string,tdnum:string)=>`//tr[.//div[text()="${carplate}"]]//td[${tdnum}]//*[text()="-"]`,
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

    //Vehicle Details = Make + Model + Submodel + Year
    async Verify_VehicleDetails(carplate:string,value:string){
        await expect(this.page.locator(this.locators.obj_TicketRecord(carplate,value))).toBeVisible();
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