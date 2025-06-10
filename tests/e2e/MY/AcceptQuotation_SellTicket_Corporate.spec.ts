import { test } from "@/tests/fixtures/MY/Quotation.fixture";
import { config } from '@config';
/*
$env:TEST_ENV="stagingCX"; npx playwright test tests/e2e/MY/AcceptQuotation_SellTicket_Corporate.spec.ts
$env:TEST_ENV="qa"; npx playwright test tests/e2e/MY/AcceptQuotation_SellTicket_Corporate.spec.ts
*/

test('Accept Quotation', async ({
    login,
    nav,
    eternal,
    sellTicketCreation,
    index,
    detail,
    apptCreation,
    apptUpdate,
}) => {
    await login.LoginCaptain();
    await nav.NavToTickets();    
    await sellTicketCreation.Submit_SellTicket_Corporate();
    await eternal.BackToOverview();
    await index.VerifyIndex_SellTicket_Corporate_New();
    await detail.VerifyDetails_SellTicket_Corporate('');
    await apptCreation.Create_AuctionAppt_Scheduled();
    // await apptUpdate.Update_AuctionAppt_Status_ScheduleConfirmed();
    
});