import { Page } from '@playwright/test';
import { BrowserUtils } from '@utils/browser-utils';
import { EternalStep } from '@common/steps/Eternal/eternal.step';
import { TicketDetailsPage } from '../TicketDetailspage.page';
import { TicketIndexPage } from '@steps/MY/Eternal/Ticketing/TicketIndexpage/TicketIndexpage.page';
import { config } from '@config';

export class DetailAfterQuotationStep {
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

    async VerifyDetails_SellTicket_Quotation_ToQuote(){

        const carplate = config.testData.car.carPlate;

        //Navigate To Eternal
        await this.browser.navigateToUrl(config.domains.eternal.baseUrl);
        await this.browser.waitForPageLoad(10000);

         //Ticket Index page
        await this.eternal.SearchBy_Carplate(carplate);
        await this.index.Verify_TicketPresent(carplate);
        await this.detail.ClickLinkToTicketDetails(carplate);
        await this.detail.ClickSellWorkflowTab();

        //2. Obtain Valuation
        await this.detail.ClickMainSection('2. Obtain valuation');
        await this.detail.VerifyQuotationStatus('To Quote');
       
    }
}