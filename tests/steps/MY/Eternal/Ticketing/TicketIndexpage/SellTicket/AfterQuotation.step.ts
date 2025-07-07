import { Page } from '@playwright/test';
import { TicketIndexPage } from '../TicketIndexpage.page';
import { EternalStep } from  '@common/steps/Eternal/eternal.step';
import { config } from '@config';


export class IndexAfterQuotationStep {
    private index: TicketIndexPage;
    private eternal: EternalStep;

    constructor(page: Page) {
        this.index = new TicketIndexPage(page);
        this.eternal = new EternalStep(page);

    }

    async VerifyIndex_SellTicket_Quotation_ToQuote(){
        const carplate = config.testData.car.carPlate;
        await this.eternal.SearchBy_Carplate(carplate);
        await this.index.Verify_TicketPresent(carplate);
    }

    async VerifyIndex_SellTicket_Quotation_Quoted() {
        const carplate = config.testData.car.carPlate
        await this.eternal.SearchBy_Carplate(carplate)
        await this.index.Verify_TicketPresent(carplate)
        await this.index.Verify_TicketType(carplate, 'Sell')
        await this.index.Verify_TicketStatus(carplate, 'Quotation Received')
        await this.index.Verify_QuotationStatus(carplate, 'Quoted')
    }

    async VerifyIndex_SellTicket_Quotation_Rejected_AfterVerifyReport() {
        const carplate = config.testData.car.carPlate
        await this.eternal.SearchBy_Carplate(carplate)
        await this.index.Verify_TicketPresent(carplate)
        await this.index.Verify_TicketType(carplate, 'Sell')
        await this.index.Verify_QuotationStatus(carplate, 'Rejected')
        await this.index.Verify_TicketStatus(carplate, 'Auction Created')
        await this.index.VerifyEmpty_Transaction(carplate)
        await this.index.Verify_InspectionStatus(carplate, 'Verified')
        await this.index.Verify_AuctionStatus(carplate, 'Ready to Publish')
    }

    async VerifyIndex_SellTicket_Quotation_Accepted(){
        const carplate = config.testData.car.carPlate;
        
        await this.eternal.SearchBy_Carplate(carplate);  
        
        //Sell Ticket
        await this.index.FilterBySellerType('Corporate');  
        await this.index.Verify_TicketType(carplate,'Sell');
        await this.index.Verify_TicketStatus(carplate,'Buy - Processing');
        await this.index.Verify_QuotationStatus(carplate,'Accepted');
        await this.index.Verify_BuyTransactionStatus(carplate,'Processing');

        //Buy In Ticket
        await this.index.FilterBySellerType('Buy In');
        await this.index.Verify_TicketType(carplate,'Sell Buy In - Converted');
        await this.index.Verify_TicketStatus(carplate,'Created From Lead');
        await this.index.VerifyEmpty_Appointment(carplate);
        await this.index.VerifyEmpty_Inspection(carplate);
        await this.index.VerifyEmpty_Quotation(carplate);
        await this.index.VerifyEmpty_Transaction(carplate);        
        await this.index.ClearFilter();
    }

}