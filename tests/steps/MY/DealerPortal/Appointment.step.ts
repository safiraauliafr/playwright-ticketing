import { Page, expect } from '@playwright/test';
import { TicketCreationPage } from '../Eternal/Ticketing/TicketCreation/TicketCreation.page';
import { config } from '@config';

export class SellPortalTicketCreationStep {
    private DealerTicketCreation: TicketCreationPage;

    constructor(page: Page) {
        this.DealerTicketCreation = new TicketCreationPage(page);
    }

    //Dealer
    async Submit_SellPortalTicket_Dealer(){
        await this.DealerTicketCreation.clickMenuSeller();
        await this.DealerTicketCreation.clickBookNow();

        //Brand
        await this.DealerTicketCreation.selectDropdownById('sellerAppointmentForm_make_id', 'TOYOTA');

        //Model
        await this.DealerTicketCreation.selectDropdownById('sellerAppointmentForm_model_id', 'ALPHARD');

        //Year
        await this.DealerTicketCreation.selectDropdownById('sellerAppointmentForm_manufacture_year', '2021',{ idxOption: 1 });
        
        //Variant
        await this.DealerTicketCreation.selectDropdownById('sellerAppointmentForm_variant_id', 'ALPHARD ANH10 4.5 AT');

        //Carplate
        await this.DealerTicketCreation.inputCarplate(config.testData.car.carPlate);

        //Start and Target Price
        await this.DealerTicketCreation.inputById('sellerAppointmentForm_starting_price', '150000');
        await this.DealerTicketCreation.inputById('sellerAppointmentForm_target_price', '155000');

        //Inspection Point
        await this.DealerTicketCreation.selectDropdownById('sellerAppointmentForm_location_id', '(M) ALOR STAR');

        //Select Date and time
        await this.DealerTicketCreation.SelectApptDate_Tomorrow();
        await this.DealerTicketCreation.SelectApptTime();

        //Submit Dealer Ticket
        await this.DealerTicketCreation.clickSubmitDealer();

        }

    //Dealer

    //Private


    
}