import { Page } from '@playwright/test';
import { TicketIndexPage } from '../TicketIndexpage.page';
import { SearchEternalStep } from '@common/steps/Eternal/search_Eternal/search_Eternal.step';
import { config } from '@config';


export class IndexBeforeQuotationStep {
    private index: TicketIndexPage;
    private search: SearchEternalStep;

    constructor(page: Page) {
        this.index = new TicketIndexPage(page);
        this.search = new SearchEternalStep(page);

    }

    async VerifyIndex_SellTicket_Corporate_New() {
        const carplate = config.testData.car.carPlate;
        await this.search.SearchBy_Carplate(carplate);
        await this.index.Verify_TicketCreated(carplate);
        await this.index.Verify_TicketOwnerName(carplate, 'Agent 2');
        await this.index.Verify_SellerType(carplate, 'corporate');
        await this.index.Verify_GroupName(carplate, 'myTukar');
        await this.index.Verify_TicketType(carplate, 'Sell');
        await this.index.Verify_TicketStatus(carplate, 'New');
        await this.index.Verify_VehicleDetails(carplate, 'PERODUA MYVI AV 2023');
        await this.index.VerifyEmpty_Appointment(carplate);
        await this.index.VerifyEmpty_Inspection(carplate);
        await this.index.VerifyEmpty_Quotation(carplate);
        await this.index.VerifyEmpty_Auction(carplate);
        await this.index.VerifyEmpty_Transaction(carplate);
        
    }
}