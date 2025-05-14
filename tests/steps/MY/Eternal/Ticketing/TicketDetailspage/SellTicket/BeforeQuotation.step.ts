import { Page } from '@playwright/test';
import { TicketDetailsPage } from '../TicketDetailspage.page';
import { config } from '@config';


export class DetailBeforeQuotationStep {
    private detail: TicketDetailsPage;

    constructor(page: Page) {
        this.detail = new TicketDetailsPage(page);
    }

    async VerifyDetails_SellTicket_Corporate(ticketID:string){
        const carplate = config.testData.car.carPlate;
        await this.detail.ClickLinkToTicketDetails(carplate);
        await this.detail.VerifyHeader('Agent 2',ticketID);
        await this.detail.VerifySidebar('Agent 2',ticketID,'Sell','New','corporate');
        await this.detail.ClickSellWorkflowTab();
        //1. Create Appointment
        await this.detail.VerifySectionStatus('1. Create appointment','In Progress');
        await this.detail.VerifyInventory(carplate,'PERODUA','MYVI','AV','2023');
        await this.detail.VerifyAuctInspectionAppt_Blank();
        //2. Obtain Valuation
        await this.detail.ClickMainSection('2. Obtain valuation');
        await this.detail.VerifyAuctionInspection_Blank();
        await this.detail.VerifyQuotation_Blank();
        await this.detail.VerifyQuotationInspection_Blank();
        //3. Transaction
        await this.detail.ClickMainSection('3. Transaction');
        await this.detail.VerifyTransaction_Blank();
    }


}