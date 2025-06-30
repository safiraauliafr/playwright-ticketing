import { test } from "@/tests/fixtures/MY/Dealer.fixture";
import { config } from '@config';
/*
$env:TEST_ENV="stagingCX"; npx playwright test tests/e2e/MY/AcceptQuotation_SellTicket_Corporate.spec.ts
$env:TEST_ENV="qa"; npx playwright test tests/e2e/MY/AcceptQuotation_SellTicket_Corporate.spec.ts
*/

test('X2B Transaction Created After Award Auction to Non-Mytukar Dealer for Sell Portal Ticket_Dealer', async ({
    Login,
    LoginDealer,
    Captain,
    Eternal,
    sellTicketDealerCreation,
    IndexBeforeQuotation,
    DetailBeforeQuotation,
    UpdateAuctionAppt,
    StartInspection_AuctionReport,
}) => {
    await LoginDealer.LoginDealer();
    await sellTicketDealerCreation.Submit_SellPortalTicket_Dealer();
    await Login.LoginExistingAccountSSO();
    await Captain.NavToTickets();       
    await IndexBeforeQuotation.VerifyIndex_SellTicket_Dealer_New();
    await DetailBeforeQuotation.VerifyDetails_SellTicket_Dealer_New('');
    await UpdateAuctionAppt.Update_AuctionAppt_Status_ScheduleConfirmedDealer(); 
    await Captain.NavToCaptainByUrl();
    await Captain.NavToWebInspection();    
    await StartInspection_AuctionReport.StartInspection_AuctionReport();
    await StartInspection_AuctionReport.CompleteInspection_AuctionReport();
    await StartInspection_AuctionReport.VerifyInspection_AuctionReport();
});