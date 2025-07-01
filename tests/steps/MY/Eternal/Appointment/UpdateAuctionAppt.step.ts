import { Page, expect } from '@playwright/test';
import { AppointmentPage } from './Appointment.page';


export class UpdateAuctionApptStep {
    private appt: AppointmentPage;

    constructor(page: Page) {
        this.appt = new AppointmentPage(page);
    }    

    async Update_AuctionAppt_Status_ScheduleConfirmed(){
        await this.appt.clickEditApptButton();
        await this.appt.SelectStatus('Schedule Confirmed');
        await this.appt.ClickUpdateButton('Schedule Confirmed');
    }

    async Update_AuctionAppt_Status_ScheduleConfirmedDealer(){
        await this.appt.ClickSubSectionID('Auction_Inspection_Appointment');
        await this.appt.clickEditApptButton();
        await this.appt.SelectStatus('Schedule Confirmed');
        await this.appt.ClickUpdateButton('Schedule Confirmed');
    }


        
}