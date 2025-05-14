import { Page , expect} from '@playwright/test';

export class TicketDetailsPage {
    private page: Page;    

    constructor(page: Page) {
        this.page = page;
    }

/*----Action Breakdown---------------------------------------------------------*/ 
    async ClickLinkToTicketDetails(carplate:string){
        await this.page.locator(`//tr[.//div[text()="${carplate}"]]//a[starts-with(@href,"/tickets/")]`).click();
        await this.page.waitForLoadState('networkidle');
    }

    async VerifyHeader_TicketOwnerName(name:string){
        await expect(this.page.locator(`(//div[text()="${name}"])[1]`)).toBeVisible();
    }

    async VerifyHeader_TicketID(ticket_id:string){
        await expect(this.page.locator('//span[text()="ID"]')).toHaveText('ID\n'+ticket_id);
    }

    async VerifySidebar_TicketOwnerName(name:string){
        await expect(this.page.locator(`(//div[text()="${name}"])[2]`)).toBeVisible();        
    }

    async VerifySidebar_TicketID(ticket_id:string){
        await expect(this.page.locator('//div[text()="ID"]')).toHaveText('ID\n'+ticket_id);
    }

    async VerifySidebar_TicketType(ticket_type:string){
        await expect(this.page.locator('//div[text()="ID"]/following-sibling::span')).toHaveText(ticket_type);
    }

    async VerifySidebar_TicketStatus(ticket_status:string){
        await expect(this.page.locator('//div[text()="ID"]/parent::div/following-sibling::div//span[@class="ant-select-selection-item"]')).toHaveText(ticket_status);
    }

    async VerifySidebar_SellerType(seller_type:string){
        await expect(this.page.locator('//div[text()="Seller Type"]/following-sibling::div')).toHaveText(seller_type);
    }

    //Sell Workflow tab
    async ClickSellWorkflowTab(){
        await this.page.getByRole('tab', {name: 'Sell Workflow'}).click();
    }
    async VerifySectionStatus(sectionName:string, status:string){
        await expect(this.page.locator(`//div[@class="ant-collapse-header" and .//div[text()="${sectionName}"]]//div[starts-with(@class,"extra_node")]/span[1]`)).toHaveText(status);
    }

    async ClickMainSection(secName: string){
        await this.page.locator(`//*[@class="ant-collapse-item" and .//*[text()="${secName}"]]`).click();
    }

    async ClickSubSectionID(sectionID:string){
        await this.page.locator(`//div[@id="${sectionID}"]//div[@class="ant-collapse-expand-icon"]`).click();
    }
    
    async VerifyInventory_ObjValue(obj:string,value:string){
        await expect(this.page.locator(`//div[@class="ant-collapse-content ant-collapse-content-active"]//span[text()="${obj}"]/following-sibling::span`)).toHaveText(value);
    }

    async VerifyQuotation_ObjValue(obj:string,value:string){
        await expect(this.page.locator(`//div[@class="ant-collapse-content ant-collapse-content-active"]//p[text()="${obj}"]/following-sibling::div`)).toHaveText(value);
    }
/*----Steps---------------------------------------------------------*/ 
    async VerifyHeader(ownerName:string, ticket_id:string){
        await this.VerifyHeader_TicketOwnerName(ownerName);
        await this.VerifyHeader_TicketID(ticket_id);
    }

    async VerifySidebar(ownerName:string, ticket_id:string, ticket_type:string, ticket_status:string, seller_type:string){
        await this.VerifySidebar_TicketOwnerName(ownerName);
        await this.VerifySidebar_TicketID(ticket_id);
        await this.VerifySidebar_TicketType(ticket_type);
        await this.VerifySidebar_TicketStatus(ticket_status);
        await this.VerifySidebar_SellerType(seller_type);
    }

    //1. Create Appointment
    //Obtain Inventory Information
    async VerifyInventory(carplate:string, make:string, model:string, submodel:string, year:string){
        await this.ClickSubSectionID('Inventory');
        await this.VerifyInventory_ObjValue('Plate no', carplate);
        await this.VerifyInventory_ObjValue('Make', make);
        await this.VerifyInventory_ObjValue('Model', model);
        await this.VerifyInventory_ObjValue('Submodel', submodel);
        await this.VerifyInventory_ObjValue('Manufacture year', year);
        await this.ClickSubSectionID('Inventory');
    }
    //Schedule Auction Inspection
    async VerifyAuctInspectionAppt_Blank(){
        await this.ClickSubSectionID('Auction_Inspection_Appointment');
        await expect(this.page.locator('//div[text()="There are no appointments"]')).toBeVisible();
        await expect(this.page.locator('//button[./*[text()="Create New appointment"]]')).toBeVisible();
        await this.ClickSubSectionID('Auction_Inspection_Appointment');
    }

    //2. Obtain Valuation
    //Auction Inspection
    async VerifyAuctionInspection_Blank(){
        await this.ClickSubSectionID('Auction_Inspection');
        await expect(this.page.locator('//div[text()="Please await inspection to be completed."]')).toBeVisible();
        await this.ClickSubSectionID('Auction_Inspection');
    }
    //Quotation
    async VerifyQuotation_Blank(){
        await this.ClickSubSectionID('Quotation');
        await this.VerifyQuotation_ObjValue('Quoted date','-');
        await this.VerifyQuotation_ObjValue('Price submitted by','-');
        await this.VerifyQuotation_ObjValue('Estimated recon cost','-');
        await this.VerifyQuotation_ObjValue('Price','-');
        await this.ClickSubSectionID('Quotation');
    }
    //Quotation Inspection
    async VerifyQuotationInspection_Blank(){
        await this.ClickSubSectionID('Quotation_Inspection');
        await expect(this.page.locator('//span[text()="Please await inspection to be completed."]')).toBeVisible();
        await this.ClickSubSectionID('Quotation_Inspection');
    }

    //3. Transaction
    //Transaction
    async VerifyTransaction_Blank(){
        await this.ClickSubSectionID('Transaction');
        await expect(this.page.locator('//div[text()="Accept a Bid Before Creating Transaction"]')).toBeVisible();
        await this.ClickSubSectionID('Transaction');
    }
    

    

     






    


}