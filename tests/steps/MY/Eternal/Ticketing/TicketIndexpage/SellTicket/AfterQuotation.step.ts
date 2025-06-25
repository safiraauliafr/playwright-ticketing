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

}