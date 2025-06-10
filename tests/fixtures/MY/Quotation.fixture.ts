import { test as base } from '@playwright/test'
import { LoginStep } from '@common/steps/Login/login-steps'
import { NavCaptainStep } from '@common/steps/Captain/nav_captain/nav_captain.step'
import { EternalStep } from '@common/steps/Eternal/eternal.step'
import { SellTicketCreationStep } from '@steps/MY/Eternal/Ticketing/TicketCreation/SellTicket.step'
import { IndexBeforeQuotationStep } from '@steps/MY/Eternal/Ticketing/TicketIndexpage/SellTicket/BeforeQuotation.step'
import { DetailBeforeQuotationStep } from '@steps/MY/Eternal/Ticketing/TicketDetailspage/SellTicket/BeforeQuotation.step'
import { AuctionApptCreationStep } from '@steps/MY/Eternal/Appointment/AuctionApptCreation.step'
import { UpdateAuctionApptStep } from '@steps/MY/Eternal/Appointment/UpdateAuctionAppt.step'


export const test = base.extend<{
  login: LoginStep
  nav: NavCaptainStep
  eternal: EternalStep
  sellTicketCreation: SellTicketCreationStep
  index: IndexBeforeQuotationStep
  detail: DetailBeforeQuotationStep
  apptCreation: AuctionApptCreationStep
  apptUpdate: UpdateAuctionApptStep
}>({
  login: async ({ page }, use) => {
    await use(new LoginStep(page))
  },
  nav: async ({ page }, use) => {
    await use(new NavCaptainStep(page))
  },
  eternal: async ({ page }, use) => {
    await use(new EternalStep(page))
  },
  sellTicketCreation: async ({ page }, use) => {
    await use(new SellTicketCreationStep(page))
  },
  index: async ({ page }, use) => {
    await use(new IndexBeforeQuotationStep(page))
  },
  detail: async ({ page }, use) => {
    await use(new DetailBeforeQuotationStep(page))
  },
  apptCreation: async ({ page }, use) => {
    await use(new AuctionApptCreationStep(page))
  },
  apptUpdate: async ({ page }, use) => {
    await use(new UpdateAuctionApptStep(page))
  }

})