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
        await this.appt.SelectInspectionPoint('USJ');
        await this.appt.SelectApptDate_Tomorrow();
        await this.appt.SelectApptTime();
        await this.appt.ClickCreateButton('Scheduled');
    }

    async Create_AuctionAppt_ScheduleConfirmed(){
        await this.appt.ClickBtnCreateNewAppt();
        await this.appt.SelectApptType('Ticket Auction Inspection');
        await this.appt.SelectStatus('Schedule Confirmed');
        await this.appt.SelectInspectionPoint('USJ');
        await this.appt.SelectApptDate_Today();
        await this.appt.SelectApptTime();
        await this.appt.ClickCreateButton('Schedule Confirmed');
        
    }


        
}