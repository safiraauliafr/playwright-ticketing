import { Page } from '@playwright/test';
import { BrowserUtils } from '@utils/browser-utils';
import { EternalStep } from '@common/steps/Eternal/eternal.step';
import { TicketDetailsPage } from '../TicketDetailspage.page';
import { TicketIndexPage } from '@steps/MY/Eternal/Ticketing/TicketIndexpage/TicketIndexpage.page';
import { config } from '@config';

export class DetailAfterTrxStep {
    private detail: TicketDetailsPage;
    private browser: BrowserUtils;
    private eternal: EternalStep;
    private index: TicketIndexPage;

    constructor(page: Page) {
        this.detail = new TicketDetailsPage(page);
        this.browser = new BrowserUtils(page);
        this.eternal = new EternalStep(page);
        this.index = new TicketIndexPage(page);
    }

    async VerifyDetails_SellPortalTicket_Dealer_X2B_Processing() {
        const carplate = config.testData.car.carPlate
        await this.detail.ClickLinkToTicketDetails(carplate)
        // await this.detail.VerifySidebar_TicketStatus('Auction Created')
        await this.detail.ClickSellWorkflowTab()
        //1. Create Appointment
        await this.detail.ClickMainSection('1. Create appointment');
        await this.detail.VerifySubSectionStatus('Auction_Inspection_Appointment', 'Successful')
        //2. Obtain Valuation
        await this.detail.ClickMainSection('2. Obtain valuation');
        await this.detail.VerifyAuctInspectionStatus('Verified')
        await this.detail.VerifyAuctionStatus('Awarded')
        //3. Transaction
        await this.detail.ClickMainSection('3. Transaction')
        await this.detail.VerifyTransactionStatus('Processing')
        await this.detail.ClickSubSectionID('Transaction')
        await this.detail.VerifyTransaction('Safira Aulia','RM 150,500');
    }

}