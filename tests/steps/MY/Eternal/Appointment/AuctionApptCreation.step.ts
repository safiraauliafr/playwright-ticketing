import { Page, expect } from '@playwright/test';
import { AppointmentPage } from './Appointment.page';


export class AuctionApptCreationStep {
    private appt: AppointmentPage;

    constructor(page: Page) {
        this.appt = new AppointmentPage(page);
    }

    async Create_AuctionAppt_Scheduled(){
        await this.appt.ClickBtnCreateNewAppt();
        await this.appt.SelectApptType('Ticket Auction Inspection');
        await this.appt.SelectStatus('Scheduled');
        await this.appt.SelectInspectionPoint('Glenmarie');
        await this.appt.SelectApptDate_Tomorrow();

    }

    async Create_AuctionAppt_ScheduleConfirmed(){
        await this.appt.ClickBtnCreateNewAppt();
        await this.appt.SelectApptType('Ticket Auction Inspection');
        await this.appt.SelectStatus('Scheduled');
        await this.appt.SelectInspectionPoint('Glenmarie');
        await this.appt.SelectApptDate_Today();
    }


        
}