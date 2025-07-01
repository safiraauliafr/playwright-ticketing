import { test as base } from '@playwright/test'
import { LoginStep } from '@common/steps/Login/login-steps'
import { CaptainStep } from '@common/steps/Captain/captain.step'
import { EternalStep } from '@common/steps/Eternal/eternal.step'
import { SellTicketCreationStep } from '@steps/MY/Eternal/Ticketing/TicketCreation/SellTicket.step'
import { IndexBeforeQuotationStep } from '@steps/MY/Eternal/Ticketing/TicketIndexpage/SellTicket/BeforeQuotation.step'
import { DetailBeforeQuotationStep } from '@steps/MY/Eternal/Ticketing/TicketDetailspage/SellTicket/BeforeQuotation.step'
import { AuctionApptCreationStep } from '@steps/MY/Eternal/Appointment/AuctionApptCreation.step'
import { UpdateAuctionApptStep } from '@steps/MY/Eternal/Appointment/UpdateAuctionAppt.step'
import { SellPortalTicketCreationStep } from '@steps/MY/DealerPortal/Appointment.step'
import { StartInspection_AuctionReportStep} from '@steps/MY/WebInspection/AuctionInspectionReportOnly.step'


export const test = base.extend<{
  Login: LoginStep
  LoginDealer: LoginStep
  Captain: CaptainStep
  Eternal: EternalStep
  IndexBeforeQuotation: IndexBeforeQuotationStep
  DetailBeforeQuotation: DetailBeforeQuotationStep
  UpdateAuctionAppt: UpdateAuctionApptStep
  StartInspection_AuctionReport: StartInspection_AuctionReportStep
  sellTicketDealerCreation: SellPortalTicketCreationStep
}>({
  Login: async ({ page }, use) => {
    await use(new LoginStep(page))
  },
  Captain: async ({ page }, use) => {
    await use(new CaptainStep(page))
  },
  LoginDealer: async ({ page }, use) => {
    await use(new LoginStep(page))
  },
  Eternal: async ({ page }, use) => {
    await use(new EternalStep(page))
  },
  IndexBeforeQuotation: async ({ page }, use) => {
    await use(new IndexBeforeQuotationStep(page))
  },
  DetailBeforeQuotation: async ({ page }, use) => {
    await use(new DetailBeforeQuotationStep(page))
  },
  UpdateAuctionAppt: async ({ page }, use) => {
    await use(new UpdateAuctionApptStep(page))
  },
  StartInspection_AuctionReport: async ({ page }, use) => {
    await use(new StartInspection_AuctionReportStep(page))
  },
  sellTicketDealerCreation: async ({ page }, use) => {
    await use(new SellPortalTicketCreationStep(page))
  }

})