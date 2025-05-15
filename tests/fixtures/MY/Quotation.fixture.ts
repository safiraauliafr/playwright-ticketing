import { test as base } from '@playwright/test'
import { LoginStep } from '@common/steps/Login/login-steps'
import { NavCaptainStep } from '@common/steps/Captain/nav_captain/nav_captain.step'
import { SellTicketCreationStep } from '@steps/MY/Eternal/Ticketing/TicketCreation/SellTicket.step'
import { IndexBeforeQuotationStep } from '@steps/MY/Eternal/Ticketing/TicketIndexpage/SellTicket/BeforeQuotation.step'
import { DetailBeforeQuotationStep } from '@steps/MY/Eternal/Ticketing/TicketDetailspage/SellTicket/BeforeQuotation.step'
import { AuctionApptCreationStep } from '@steps/MY/Eternal/Appointment/AuctionApptCreation.step'

export const test = base.extend<{
  login: LoginStep
  nav: NavCaptainStep
  sellTicketCreation: SellTicketCreationStep
  index: IndexBeforeQuotationStep
  detail: DetailBeforeQuotationStep
  appointment: AuctionApptCreationStep
}>({
  login: async ({ page }, use) => {
    await use(new LoginStep(page))
  },
  nav: async ({ page }, use) => {
    await use(new NavCaptainStep(page))
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
  appointment: async ({ page }, use) => {
    await use(new AuctionApptCreationStep(page))
  } 
})