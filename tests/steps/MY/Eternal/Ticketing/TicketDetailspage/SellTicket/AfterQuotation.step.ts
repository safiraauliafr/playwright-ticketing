import { Page } from '@playwright/test';
import { TicketDetailsPage } from '../TicketDetailspage.page';
import { config } from '@config';

export class DetailAfterQuotationStep {
    private detail: TicketDetailsPage;

    constructor(page: Page) {
        this.detail = new TicketDetailsPage(page);
    }

    async VerifyDetails_SellTicket_Quotation_Quoted() {
        const carplate = config.testData.car.carPlate
        await this.detail.ClickLinkToTicketDetails(carplate)
        await this.detail.VerifySidebar_TicketStatus('Quotation Received')
        await this.detail.ClickSellWorkflowTab()
        //2. Obtain Valuation
        await this.detail.VerifyQuotationStatus('Quoted')
        //3. Transaction
        await this.detail.ClickMainSection('3. Transaction')
        await this.detail.VerifyTransaction_Blank()
    }

    async VerifyDetails_SellTicket_Quotation_Rejected_AfterVerifyReport() {
        const carplate = config.testData.car.carPlate
        await this.detail.ClickLinkToTicketDetails(carplate)
        await this.detail.VerifySidebar_TicketStatus('Auction Created')
        await this.detail.ClickSellWorkflowTab()
        //2. Obtain Valuation
        await this.detail.VerifyAuctInspectionStatus('Verified')
        await this.detail.VerifyAuctionStatus('Ready to Publish')
        await this.detail.VerifyQuotationStatus('Auction')
        await this.detail.ClickSubSectionID('Quotation')
        await this.detail.VerifyQuotationStatus('Rejected')
        await this.detail.VerifyQuotation_ObjValue('Price','RM 40,000') //offer price
        await this.detail.ClickSubSectionID('Quotation')
        //3. Transaction
        await this.detail.ClickMainSection('3. Transaction')
        await this.detail.VerifyTransaction_Blank()
    }
}