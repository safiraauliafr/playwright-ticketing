import { test } from "@/tests/fixtures/MY/Quotation.fixture";
import { config } from '@config';
/*
$env:TEST_ENV="stagingCX"; npx playwright test tests/e2e/MY/AcceptQuotation_SellTicket_Corporate.spec.ts
$env:TEST_ENV="qa"; npx playwright test tests/e2e/MY/AcceptQuotation_SellTicket_Corporate.spec.ts
*/

test('Accept Quotation', async ({
    Login,
    Captain,
    Eternal,
    SellTicketCreation,
    IndexBeforeQuotation,
    DetailBeforeQuotation,
    AuctionApptCreation,
    UpdateAuctionAppt,
    QuotationInspectionReport,
    AuctionInspectionReport_withQuotationReport,
    Details_SellTicket_Quotation_ToQuote
}) => {
    await Login.LoginCaptain();
    await Captain.NavToTickets();    
    await SellTicketCreation.Submit_SellTicket_Corporate();
    await IndexBeforeQuotation.VerifyIndex_SellTicket_Corporate_New();
    await DetailBeforeQuotation.VerifyDetails_SellTicket_Corporate('');
    await AuctionApptCreation.Create_AuctionAppt_Scheduled();
    await UpdateAuctionAppt.Update_AuctionAppt_Status_ScheduleConfirmed(); 
    await Captain.NavToCaptainByUrl();
    await Captain.NavToWebInspection();
    await QuotationInspectionReport.StartInspection_QuotationReport();
    await QuotationInspectionReport.CompleteInspection_QuotationReport();
    await AuctionInspectionReport_withQuotationReport.ContinueInspection_AuctionReport_fromQuotation();
    await AuctionInspectionReport_withQuotationReport.VerifyInspection_AuctionReport_withQuotation();
    await Details_SellTicket_Quotation_ToQuote.VerifyDetails_SellTicket_Quotation_ToQuote();
});