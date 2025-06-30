import { Page } from '@playwright/test'
import { QuotationPage } from './Quotation.page'
import { config } from '@config'

export class QuotationIndexStep {
    private quotation: QuotationPage
        
    constructor(page: Page) {
        this.quotation = new QuotationPage(page)
    }

    async NavToQuotationByUrl() {
        await this.quotation.NavTo_QuotationPage()
    }

    async VerifyIndex_ToQuoteTab() {
        const carplate = config.testData.car.carPlate
        await this.quotation.Search_ByCarplate(carplate)
        await this.quotation.Verify_QuotationStatus(carplate, 'To Quote')
        await this.quotation.Verify_QuotationInspectionStatus(carplate, 'Completed')
        await this.quotation.Click_ActionButton(carplate)
        await this.quotation.Verify_Empty_ManualValuation('Manual Wholesale Price')
        await this.quotation.Verify_Empty_ManualValuation('Manual Offer Price')
        await this.quotation.Verify_UserExpectedPrice('RM 40,500') /* target price */
        await this.quotation.Exit_Drawer()
    }
}