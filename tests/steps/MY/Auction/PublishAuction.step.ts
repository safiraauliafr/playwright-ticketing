import { Page } from '@playwright/test';
import { BrowserUtils } from '@utils/browser-utils';
import { config } from '@config';
import { EternalStep } from '@common/steps/Eternal/eternal.step';
import { AuctionPage } from '@steps/MY/Auction/Auction.page';
import { TicketIndexPage } from '@steps/MY/Eternal/Ticketing/TicketIndexpage/TicketIndexpage.page';
import { TicketDetailsPage } from '@steps/MY/Eternal/Ticketing/TicketDetailspage/TicketDetailspage.page';
import { DatabaseUtils } from '@utils/database.utils';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.qa'})

export class StartPublishAuctionStep {
    public auctionId: string = '';
    private browser: BrowserUtils;
    private auction: AuctionPage;
    private eternal: EternalStep;
    private index: TicketIndexPage;
    private detail: TicketDetailsPage;
    private page: Page;

    constructor(page: Page) {
        this.browser = new BrowserUtils(page);
        this.auction = new AuctionPage(page);
        this.eternal = new EternalStep(page);
        this.index = new TicketIndexPage(page);
        this.detail = new TicketDetailsPage(page);
        this.page = page;
        dotenv.config({ path: '.env.qa' });
    }

    async PublishAuction_FromAuctionDetailsPage(){

        const carplate = config.testData.car.carPlate;

         //Navigate To Auction
        await this.browser.navigateToUrl(config.domains.captain.baseUrl+"auctions")
        await this.browser.waitForPageLoad(10000);

        //Start to publish auction
        await this.auction.SearchAuctionByCarplate('Ready',carplate);
        await this.browser.waitForPageLoad(10000);
        await this.browser.waitForPageLoad(10000);
        await this.auction.ClickBtnAuction('auction.button.start');
        await this.auction.SelectApptDateAuction_Today('date');
        await this.auction.SelectAuctionSession();
        await this.auction.VerifyAuctionStatus('Preview');
    }

    async Run(): Promise<void> {
        const id = await this.page.textContent('//span[@class="Breadcrumbs__BreadcrumbLink-sc-bhi9m8-0 ljlwwW"]');
        this.auctionId = id?.trim() || '';
        console.log('Extracted Auction ID:', this.auctionId);
        await this.UpdateAuction_ToEnded_FromDB(this.auctionId);
  }

  async UpdateAuction_ToEnded_FromDB(auctionId: string): Promise<void> {

        const id = await this.page.textContent('//span[@class="Breadcrumbs__BreadcrumbLink-sc-bhi9m8-0 ljlwwW"]');
        auctionId = id?.trim() || '';
        console.log('Extracted Auction ID:', auctionId);
       
        const success = await DatabaseUtils.updateAuctionStatus(auctionId);
        if (!success) {
        throw new Error(`Failed to update status for auction ${auctionId}`);
        }
        console.log('✅ Status updated successfully for auction:', auctionId);
  }

   

    async AwardAuction_Winner_NonMytukarDealer(){

        const carplate = config.testData.car.carPlate;

         //Navigate To Auction
        await this.browser.navigateToUrl(config.domains.captain.baseUrl+"auctions")
        await this.browser.waitForPageLoad(10000);

        //Check auction status = Ended
        await this.auction.SearchAuctionByCarplate('Ended',carplate);
        const newTab = await this.auction.VerifyAuctionStatus('Ended');
        await this.page.waitForTimeout(1000);

        //Place bid to non mytukar seller
        await this.auction.ClickAuctionTab('auction.bid');
        await this.page.waitForTimeout(1000);
        await this.auction.SelectById('user_id');
        await this.auction.SelectListActive();
        await this.page.waitForTimeout(1000);
        await this.auction.InputById('amount','150500');
        await this.auction.ClickBtnAuction('core.smartForm.submit');
        await this.auction.ClickAwardBtn();
        await this.page.waitForTimeout(3000);

        //Navigate to Eternal to verify updates in Ticket
        await this.browser.navigateToUrl(config.domains.eternal.baseUrl);
        await this.browser.waitForPageLoad(10000);
    }
        
       
}
