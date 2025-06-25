import { Page , expect} from '@playwright/test';
import {formatDate} from '@common/utils/date-utils';
import { BasePage } from '@basepage';

export class AppointmentPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }
/*----Locators---------------------------------------------------------*/
    locators = {
        dropdown_id:(id:string) => `//div[@class="ant-select-selector" and .//input[@id="${id}"]]`,
        input_id:(id:string) => `//input[@id="${id}"]`,
        option_dropdown:(opt:string)=>`//div[@class="ant-select-item-option-content" and text()="${opt}"]`,
        date_title:(date:string) => `//td[@title="${date}"]`,
    }
/*----Actions---------------------------------------------------------*/

    async ClickCollapseScheduleAuctInsp(){
        await this.page.locator('//div[@id="Auction_Inspection_Appointment"]').click();
    }
    async ClickBtnCreateNewAppt(){
        const btn_CreateNewAppt = '//button[./*[text()="Create New appointment"]]';
        //if btn not visible, click collapse first
        if(!(await this.page.locator(btn_CreateNewAppt).isVisible())){
            await this.ClickCollapseScheduleAuctInsp();
        }            
        await this.page.locator(btn_CreateNewAppt).click();
    }
    
    async SelectApptType(type:string){
        await this.page.locator(this.locators.dropdown_id('appointment_type_id')).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.locators.option_dropdown(type)).click();
    }
    async SelectStatus(status:string){
        await this.page.locator(this.locators.dropdown_id('status_id')).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.locators.option_dropdown(status)).click();
    }
    async SelectInspectionPoint(point:string){
        await this.page.locator(this.locators.dropdown_id('location_id')).click();
        await this.page.locator(this.locators.input_id('location_id')).fill(point);
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.locators.option_dropdown(point)).click();
    }
    async SelectApptDate_Today(){
        await this.page.locator(this.locators.input_id('start_time')).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('//a[text()="Today"]').click();
    }
    async getTitleByObj(locator:string){
        const title = await this.page.locator(locator).getAttribute('title') || ''; //could be null
        return title;
    }
    async SelectApptDate_Tomorrow(){
        await this.page.locator(this.locators.input_id('start_time')).click();
        await this.page.waitForTimeout(1000);
        //date format is yyyy-mm-dd
        const strToday = await this.getTitleByObj('//td[contains(@class,"ant-picker-cell-in-view ant-picker-cell-today")]');
        const dateToday = new Date(strToday);  
        //Add one day
        const dateTomorrow = new Date(dateToday);
        dateTomorrow.setDate(dateToday.getDate() + 1);
        const strTomorrow = formatDate(dateTomorrow, 'yyyy-MM-dd');
        console.log('strTomorrow: ' + strTomorrow);
        await this.page.locator(`//td[@title="${strTomorrow}"]`).click();   
    }

    async SelectApptTime(){
        await this.page.locator('//div[starts-with(@class,"ant-row ant-form-item-row ") and .//*[text()="Appointment time"]]//input').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('//div[@class="ant-tabs-tabpane ant-tabs-tabpane-active"]//li[.//*[contains(.,"Slot")]]').first().click();        
    }

    async clickEditApptButton(){
        await this.page.locator('//div[@id="Auction_Inspection_Appointment"]//button[.="Edit"]').click();
        await this.page.waitForTimeout(2000);
    }

    async ClickCreateButton(apptStatus:string){
        await this.page.locator('//button[.//*[text()="Create"]]').click();        
        await this.page.locator(`//div[@id="Auction_Inspection_Appointment" and .//*[text()="${apptStatus}"]]`).waitFor({state:'visible',timeout:120000});
        await this.page.waitForTimeout(2000);
    }

    async ClickUpdateButton(apptStatus:string){
        await this.page.locator('//button[.//*[text()="Update"]]').click();
        await this.page.locator(`//div[@id="Auction_Inspection_Appointment" and .//*[text()="${apptStatus}"]]`).waitFor({state:'visible',timeout:120000});
        await this.page.waitForTimeout(2000);
    }


    
}