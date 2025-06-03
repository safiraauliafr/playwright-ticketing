import { Page, expect } from '@playwright/test';
import { AppointmentPage } from './Appointment.page';


export class AuctionApptCreationStep {
    private appt: AppointmentPage;

    constructor(page: Page) {
        this.appt = new AppointmentPage(page);
    }    

    async Update_AuctionAppt_Status_ScheduleConfirmed(){

    }


        
}