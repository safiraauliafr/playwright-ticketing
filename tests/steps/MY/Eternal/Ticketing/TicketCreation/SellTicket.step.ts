import { Page, expect } from '@playwright/test';
import { TicketCreationPage } from './TicketCreation.page';
import { config } from '@config';


export class SellTicketCreationStep {
    private TicketCreation: TicketCreationPage;

    constructor(page: Page) {
        this.TicketCreation = new TicketCreationPage(page);
    }

    //Corporate
    async Submit_SellTicket_Corporate(){
        await this.TicketCreation.clickBtnNewTicket();
        await this.TicketCreation.selectTicketType('Sell');
        await this.TicketCreation.selectSellerType('Corporate');

        //User Details
        await this.TicketCreation.selectCompanyName('Agent Company2');
        await this.TicketCreation.selectName('Agent 2');

        //Vehicle Info
        await this.TicketCreation.selectMake('PERODUA');
        await this.TicketCreation.selectModel('MYVI');
        await this.TicketCreation.selectSubmodel('AV');
        await this.TicketCreation.fillManufactureYear('2023');

        //Price Details
        await this.TicketCreation.fillBasePrice('40000');
        await this.TicketCreation.fillTargetPrice('40500');

        //Car Details
        await this.TicketCreation.selectInterchange('No');
        await this.TicketCreation.fillCarplate(config.testData.car.carPlate);
        await this.TicketCreation.selectOutstandingLoan('No');
        const ticketID = await this.TicketCreation.clickAddNewButton();
        await this.TicketCreation.verify_TicketCreatedSuccessfulNotif(ticketID);
    }

    //Dealer

    //Private


    
}