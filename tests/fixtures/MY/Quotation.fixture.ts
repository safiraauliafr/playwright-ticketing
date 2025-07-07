import { test as base } from '@playwright/test'
import { enableHighlighting } from "@utils/highlight-patch"

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
import { QuotationIndexStep } from '@steps/MY/Quotation/QuotationIndexpage.step'
import { QuotationDrawerStep } from '@steps/MY/Quotation/QuotationDrawerpage.step'
import { IndexAfterQuotationStep } from '@steps/MY/Eternal/Ticketing/TicketIndexpage/SellTicket/AfterQuotation.step'
import { DetailAfterQuotationStep } from '@steps/MY/Eternal/Ticketing/TicketDetailspage/SellTicket/AfterQuotation.step'


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
  QuotationIndex: QuotationIndexStep
  QuotationDrawer: QuotationDrawerStep
  IndexAfterQuotation: IndexAfterQuotationStep
  DetailAfterQuotation: DetailAfterQuotationStep
  Details_SellTicket_Quotation_ToQuote: DetailAfterQuotationStep

}>({

  page: async ({ page }, use) => {
    enableHighlighting(page); 
    await use(page);
  },
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
  QuotationIndex: async ({ page }, use) => {
    await use(new QuotationIndexStep(page))
  },
  QuotationDrawer: async ({ page }, use) => {
    await use(new QuotationDrawerStep(page))
  },
  IndexAfterQuotation: async ({ page }, use) => {
    await use(new IndexAfterQuotationStep(page))
  },
  DetailAfterQuotation: async ({ page }, use) => {
    await use(new DetailAfterQuotationStep(page))
  },
})