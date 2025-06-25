import { test as base } from '@playwright/test'
import { LoginStep } from '@common/steps/Login/login-steps'
import { CaptainStep } from '@common/steps/Captain/captain.step'
import { EternalStep } from '@common/steps/Eternal/eternal.step'
import { SellTicketCreationStep } from '@steps/MY/Eternal/Ticketing/TicketCreation/SellTicket.step'
import { IndexBeforeQuotationStep } from '@steps/MY/Eternal/Ticketing/TicketIndexpage/SellTicket/BeforeQuotation.step'
import { DetailBeforeQuotationStep } from '@steps/MY/Eternal/Ticketing/TicketDetailspage/SellTicket/BeforeQuotation.step'
import { AuctionApptCreationStep } from '@steps/MY/Eternal/Appointment/AuctionApptCreation.step'
import { UpdateAuctionApptStep } from '@steps/MY/Eternal/Appointment/UpdateAuctionAppt.step'
import { QuotationInspectionReportStep } from '@steps/MY/WebInspection/QuotationInspectionReport.step'
import { AuctionInspectionReport_withQuotationReportStep} from '@steps/MY/WebInspection/AuctionInspectionReport_withQuotationReport.step'


export const test = base.extend<{
  Login: LoginStep
  Captain: CaptainStep
  Eternal: EternalStep
  SellTicketCreation: SellTicketCreationStep
  IndexBeforeQuotation: IndexBeforeQuotationStep
  DetailBeforeQuotation: DetailBeforeQuotationStep
  AuctionApptCreation: AuctionApptCreationStep
  UpdateAuctionAppt: UpdateAuctionApptStep
  QuotationInspectionReport: QuotationInspectionReportStep
  AuctionInspectionReport_withQuotationReport: AuctionInspectionReport_withQuotationReportStep
}>({
  Login: async ({ page }, use) => {
    await use(new LoginStep(page))
  },
  Captain: async ({ page }, use) => {
    await use(new CaptainStep(page))
  },
  Eternal: async ({ page }, use) => {
    await use(new EternalStep(page))
  },
  SellTicketCreation: async ({ page }, use) => {
    await use(new SellTicketCreationStep(page))
  },
  IndexBeforeQuotation: async ({ page }, use) => {
    await use(new IndexBeforeQuotationStep(page))
  },
  DetailBeforeQuotation: async ({ page }, use) => {
    await use(new DetailBeforeQuotationStep(page))
  },
  AuctionApptCreation: async ({ page }, use) => {
    await use(new AuctionApptCreationStep(page))
  },
  UpdateAuctionAppt: async ({ page }, use) => {
    await use(new UpdateAuctionApptStep(page))
  },
  QuotationInspectionReport: async ({ page }, use) => {
    await use(new QuotationInspectionReportStep(page))
  },
  AuctionInspectionReport_withQuotationReport: async ({ page }, use) => {
    await use(new AuctionInspectionReport_withQuotationReportStep(page))
  },

})