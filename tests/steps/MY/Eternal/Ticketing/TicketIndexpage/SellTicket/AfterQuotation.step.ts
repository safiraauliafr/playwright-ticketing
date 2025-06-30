import { Page } from '@playwright/test';
import { TicketIndexPage } from '../TicketIndexpage.page';
import { EternalStep } from  '@common/steps/Eternal/eternal.step';
import { config } from '@config';


export class IndexAfterQuotationStep {
    private index: TicketIndexPage;
    private eternal: EternalStep;

    constructor(page: Page) {
        this.index = new TicketIndexPage(page);
        this.eternal = new EternalStep(page);

    }

    async VerifyIndex_SellTicket_Quotation_ToQuote(){
        const carplate = config.testData.car.carPlate;
        await this.eternal.SearchBy_Carplate(carplate);
        await this.index.Verify_TicketPresent(carplate);
    }

    async VerifyIndex_SellTicket_Quotation_Quoted() {
        const carplate = config.testData.car.carPlate
        await this.eternal.SearchBy_Carplate(carplate)
        await this.index.Verify_TicketPresent(carplate)
        await this.index.Verify_TicketType(carplate, 'Sell')
        await this.index.Verify_TicketStatus(carplate, 'Quotation Received')
        await this.index.Verify_QuotationStatus(carplate, 'Quoted')
    }

    async VerifyIndex_SellTicket_Quotation_Rejected_AfterVerifyReport() {
        const carplate = config.testData.car.carPlate
        await this.eternal.SearchBy_Carplate(carplate)
        await this.index.Verify_TicketPresent(carplate)
        await this.index.Verify_TicketType(carplate, 'Sell')
        await this.index.Verify_QuotationStatus(carplate, 'Rejected')
        await this.index.Verify_TicketStatus(carplate, 'Auction Created')
        await this.index.VerifyEmpty_Transaction(carplate)
        await this.index.Verify_InspectionStatus(carplate, 'Verified')
        await this.index.Verify_AuctionStatus(carplate, 'Ready to Publish')
    }

}