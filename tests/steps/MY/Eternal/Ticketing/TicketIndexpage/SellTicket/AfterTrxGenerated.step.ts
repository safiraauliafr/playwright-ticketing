import { Page } from '@playwright/test';
import { TicketIndexPage } from '../TicketIndexpage.page';
import { EternalStep } from  '@common/steps/Eternal/eternal.step';
import { config } from '@config';


export class IndexAfterTrxStep {
    private index: TicketIndexPage;
    private eternal: EternalStep;

    constructor(page: Page) {
        this.index = new TicketIndexPage(page);
        this.eternal = new EternalStep(page);

    }

    async VerifyIndex_SellPortalTicket_Dealer_X2B_Processing(){
        const carplate = config.testData.car.carPlate;
        await this.eternal.SearchBy_Carplate(carplate);
        await this.index.Verify_TicketPresent(carplate);
        await this.index.Verify_TicketOwnerName(carplate, 'Safira Aulia');
        await this.index.Verify_SellerType(carplate, 'dealer');
        await this.index.Verify_GroupName(carplate, 'myTukar');
        await this.index.Verify_TicketType(carplate, 'Sell Portal');
        // await this.index.Verify_TicketStatus(carplate, 'Auction Created');        
        await this.index.Verify_AuctionStatus(carplate, 'Awarded');
        await this.index.Verify_TransactionStatus(carplate, 'Processing');
        await this.index.Verify_TransactionType(carplate, 'X2B');
    }

}