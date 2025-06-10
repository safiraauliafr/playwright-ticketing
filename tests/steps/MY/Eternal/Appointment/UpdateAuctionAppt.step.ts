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


        
}