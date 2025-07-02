import { Page } from '@playwright/test'
import { QuotationPage } from './Quotation.page'
import { config } from '@config'

export class QuotationDrawerStep {
    private quotation: QuotationPage
        
    constructor(page: Page) {
        this.quotation = new QuotationPage(page)
    }

    async Submit_OfferPrice_fromToQuoteTab() {
        const carplate = config.testData.car.carPlate
        await this.quotation.Click_ActionButton(carplate)
        await this.quotation.Submit_OfferPrice(carplate)
        await this.quotation.Verify_QuotationStatus(carplate, 'Quoted')
    }

    async Reject_OfferPrice_fromQuotedTab_AfterVerifyReport() {
        const carplate = config.testData.car.carPlate
        await this.quotation.Select_TabName("Quoted")
        await this.quotation.Search_ByCarplate(carplate)
        await this.quotation.Reject_OfferPrice(carplate)
    }

    async Accept_OfferPrice_fromQuotedTab(){
        const carplate = config.testData.car.carPlate;

        await this.quotation.Select_TabName("Quoted")
        await this.quotation.Search_ByCarplate(carplate)
        await this.quotation.Accept_OfferPrice(carplate);
    }
}