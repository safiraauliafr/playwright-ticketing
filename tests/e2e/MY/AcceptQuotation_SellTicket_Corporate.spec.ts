import { test } from "@/tests/steps/MY/fixtures/AcceptQuotation.fixture";
import { config } from '@config';

/*Command: 
$env:TEST_ENV="stagingCX"; npx playwright test tests/e2e/MY/AcceptQuotation_SellTicket_Corporate.spec.ts
$env:TEST_ENV="qa"; npx playwright test tests/e2e/MY/AcceptQuotation_SellTicket_Corporate.spec.ts
*/
test('Sell Ticket Creation', async ({
    login,
    nav,
    sellTicketCreation,
    index,
    detail,
    appointment,
}) => {
    await login.LoginCaptain();
    await nav.NavToTickets();
    await sellTicketCreation.Submit_SellTicket_Corporate();
    await index.VerifyIndex_SellTicket_Corporate_New();
    await detail.VerifyDetails_SellTicket_Corporate('');
    await appointment.Create_AuctionAppt_Scheduled();
});