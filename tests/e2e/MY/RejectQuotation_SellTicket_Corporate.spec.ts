import { test } from "@/tests/fixtures/MY/Quotation.fixture";
import { IndexAfterQuotationStep } from "@/tests/steps/MY/Eternal/Ticketing/TicketIndexpage/SellTicket/AfterQuotation.step";
import { config } from '@config';
/*
$env:TEST_ENV="stagingCX"; $env:CAR_PLATE="XXXX1234"; npx playwright test tests/e2e/MY/RejectQuotation_SellTicket_Corporate.spec.ts
$env:TEST_ENV="qa"; $env:CAR_PLATE="XXXX1234"; npx playwright test tests/e2e/MY/RejectQuotation_SellTicket_Corporate.spec.ts
*/

test('Reject Quotation', async ({
    Login,
    Captain,
    Eternal,
    SellTicketCreation,
    IndexBeforeQuotation,
    DetailBeforeQuotation,
    AuctionApptCreation,
    QuotationInspectionReport,
    AuctionInspectionReport_withQuotationReport,
    QuotationIndex,
    QuotationDrawer,
    IndexAfterQuotation,
    DetailAfterQuotation,
}) => {
    await Login.LoginCaptain()
    await Captain.NavToTickets()
    await SellTicketCreation.Submit_SellTicket_Corporate()
    await IndexBeforeQuotation.VerifyIndex_SellTicket_Corporate_New()
    await DetailBeforeQuotation.VerifyDetails_SellTicket_Corporate('')
    await AuctionApptCreation.Create_AuctionAppt_ScheduleConfirmed()
    await Captain.NavToCaptainByUrl()
    await Captain.NavToWebInspection()
    await QuotationInspectionReport.StartInspection_QuotationReport()
    await QuotationInspectionReport.CompleteInspection_QuotationReport()
    await AuctionInspectionReport_withQuotationReport.ContinueInspection_AuctionReport_fromQuotation()
    await AuctionInspectionReport_withQuotationReport.VerifyInspection_AuctionReport_withQuotation()
    await QuotationIndex.NavToQuotationByUrl()
    await QuotationIndex.VerifyIndex_ToQuoteTab()
    await QuotationDrawer.Submit_OfferPrice_fromToQuoteTab()
    await Eternal.NavToEternalByUrl()
    await IndexAfterQuotation.VerifyIndex_SellTicket_Quotation_Quoted()
    await DetailAfterQuotation.VerifyDetails_SellTicket_Quotation_Quoted()
    await QuotationIndex.NavToQuotationByUrl()
    await QuotationDrawer.Reject_OfferPrice_fromQuotedTab_AfterVerifyReport()
    await Eternal.NavToEternalByUrl()
    await IndexAfterQuotation.VerifyIndex_SellTicket_Quotation_Rejected_AfterVerifyReport()
    await DetailAfterQuotation.VerifyDetails_SellTicket_Quotation_Rejected_AfterVerifyReport()
});