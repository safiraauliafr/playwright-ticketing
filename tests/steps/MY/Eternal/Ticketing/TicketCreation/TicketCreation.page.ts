import { Locator, Page , expect} from '@playwright/test';
import {formatDate} from '@common/utils/date-utils';
import { TestDataManager } from '@utils/test-data-manager';
import { BasePage } from '@basepage';

export class TicketCreationPage  extends BasePage {   

    constructor(page: Page) {
        super(page);
    }

/*-----Locators-----------------------------------------------*/
    locators = {
        //dynamic locators
        li_option:(variable:string) => `//li[.="${variable}"]`,
        div_id:(variable:string) => `//div[@id="${variable}"]`,
        input_id:(variable:string) => `//input[@id="${variable}"]`,  
        a_href: (variable: string) => `//a[@href="${variable}"]`,
        btn_text: (variable: string) => `//button[text()="${variable}"]`,     
    } 

/*------Action breakdown--------------------------------------*/
    async getIframe() {
        const iframe = 'iframe[src*="/tickets-shared/create"]';
        await this.page.waitForSelector(iframe,{state: 'visible', timeout:60000});     
        return this.page.frameLocator(iframe);
    }
    async clickBtnNewTicket() {        
        await this.page.getByRole('button',{name:'New Ticket'}).click();
        const iframe = await this.getIframe();
        await iframe.locator('//div[starts-with(@class,"TicketContextSelector__StyledSelector")]').waitFor({state: 'visible'})
    }
    async selectTicketType(ticketType:string) {
        const iframe = await this.getIframe();   
           
        let attempts = 0;
        const maxAttempts = 5;
        while (attempts < maxAttempts){
            await iframe.locator('//div[starts-with(@class,"TicketContextSelector__StyledSelector")]').click();
            if (await iframe.locator(this.locators.li_option(ticketType)).isVisible({timeout:3000})){
                break;
            }
            attempts++;
            if (attempts === maxAttempts) {
                throw new Error('Element not present after 5 attempts');
            }
        }
        await iframe.locator(this.locators.li_option(ticketType)).click();
        await iframe.locator('//div[starts-with(@class,"SellerTypeSelector__StyledWrapper-")]').waitFor({state: 'visible'});
    }

    async selectSellerType(sellerType:string){
        const iframe = await this.getIframe();
        await iframe.locator('//div[starts-with(@class,"SellerTypeSelector__StyledWrapper-")]').click();
        await iframe.locator(this.locators.li_option(sellerType)).click();
    }


    //CompanyName
    async selectCompanyName(companyName:string){
        const iframe = await this.getIframe();
        await iframe.locator(this.locators.div_id('additional_data.company_id')).waitFor({state: 'visible'});
        await iframe.locator(this.locators.div_id('additional_data.company_id')).click();
        await iframe.locator(this.locators.input_id('additional_data.company_id')).fill(companyName);
        await iframe.locator(this.locators.li_option(companyName)).click();
    }
    //Name
    async selectName(name:string){
        const iframe = await this.getIframe();
        await iframe.locator(this.locators.div_id('additional_data.user_id')).waitFor({state: 'visible'});
        await iframe.locator(this.locators.div_id('additional_data.user_id')).click();
        await iframe.locator(this.locators.input_id('additional_data.user_id')).waitFor({state: 'visible'});
        await iframe.locator(this.locators.input_id('additional_data.user_id')).fill(name);
        await iframe.locator(`//li[./*[contains(.,"${name}")]]`).waitFor({state: 'visible'});
        await iframe.locator(`//li[./*[contains(.,"${name}")]]`).click();
    }

    async selectFromDropdown(id:string,value:string){
        const iframe = await this.getIframe();
        await iframe.locator(this.locators.div_id(id)).waitFor({state: 'visible'});
        await iframe.locator(this.locators.div_id(id)).isEnabled();
        await iframe.locator(this.locators.div_id(id)).click();
        await iframe.locator(this.locators.input_id(id)).waitFor({state: 'visible'});
        await iframe.locator(this.locators.input_id(id)).isEnabled();
        await iframe.locator(this.locators.input_id(id)).fill(value);
        await iframe.locator(this.locators.li_option(value)).waitFor({state: 'visible'});
        await iframe.locator(this.locators.li_option(value)).click();
    }
    //Make
    async selectMake(Make:string){
        await this.selectFromDropdown('additional_data.make_id',Make);
    }
    //Model
    async selectModel(Model:string){
        await this.selectFromDropdown('additional_data.model_id',Model);
    }
    //Submodel
    async selectSubmodel(Submodel:string){
        await this.selectFromDropdown('additional_data.submodel_id',Submodel);
    }
    //ManufactureYear
    async fillManufactureYear(ManufactureYear:string){
        const iframe = await this.getIframe();
        await iframe.locator(this.locators.input_id('additional_data.year_of_manufacture')).fill(ManufactureYear);
    }
    //BasePrice additional_data.price 
    async fillBasePrice(BasePrice:string){
        const iframe = await this.getIframe();
        await iframe.locator(this.locators.input_id('additional_data.price')).fill(BasePrice);
    }
    //TargetPrice additional_data.expected_price
    async fillTargetPrice(TargetPrice:string){
        const iframe = await this.getIframe();
        await iframe.locator(this.locators.input_id('additional_data.expected_price')).fill(TargetPrice);
    }
    //Interchange
    async selectInterchange(value:string){
        const iframe = await this.getIframe();
        const radioBtn = `//input[@aria-label="additional_data.interchange_${value}"]`
        if(value=='Yes'){
            await iframe.locator('//input[@aria-label="additional_data.interchange_true"]').click(); 
        }else if(value=='No'){
            await iframe.locator('//input[@aria-label="additional_data.interchange_false"]').click(); 
            
        }
    }
    //Carplate additional_data.car_plate
    async fillCarplate(Carplate:string){
        const iframe = await this.getIframe();
        await iframe.locator(this.locators.input_id('additional_data.car_plate')).fill(Carplate);
    }
    //HaveOutstandingLoan
    async selectOutstandingLoan(value:string){
        const iframe = await this.getIframe();
        if(value=='Yes'){
            await iframe.locator('//input[@aria-label="additional_data.have_outstanding_loan_true"]').click();      
        }else if(value=='No'){
            await iframe.locator('//input[@aria-label="additional_data.have_outstanding_loan_false"]').click();
        }
    }
    async clickAddNewButton(){
        const iframe = await this.getIframe();
        await iframe.locator('//button[.="Add New"]').click();
        const msg = 'Ticket created successfully!';
        await iframe.getByText(msg).waitFor({state: 'visible',timeout:60000});
        const getticketID = await iframe.getByText(msg).textContent() || '';
        console.log(getticketID);
        const TicketID = getticketID?.split('ID: ')[1].trim();
        console.log(TicketID);
        // const testDataManager = TestDataManager.getInstance();
        // testDataManager.saveTestData('tickets', 'ticket',TicketID);
        return TicketID;
    }
    async verify_TicketCreatedSuccessfulNotif(ticketID:string){
        await this.page.getByText('Success!').waitFor({state: 'visible'});
        await this.page.getByText(`Ticket ${ticketID} has been created.`).waitFor({state: 'visible'});
    }

    //Dealer
    async selectDropdownById(fieldName: string, option: string, opt?: { idxInput?: number,idxOption?: number }) {
        const inputId = await this.getValidLocator(`//input[@id='${fieldName}']`,1,opt);
        await inputId.click();
        const filledValue = await this.getValidLocator(`//div[text()="${option}"]`,2,opt)
        await filledValue.click();
        await this.page.waitForTimeout(1000);
    }

    async inputById(fieldName: string, value: string) {
        await this.page.locator(`//input[@id='${fieldName}']`).fill(value);
        await this.page.waitForTimeout(1000);
    }

    //Seller Portal
    async clickMenuSeller() {
        await this.page.locator(this.locators.a_href('/sellers/appointments')).click();
    }
    async clickBookNow() {
        await this.page.locator(this.locators.a_href('/sellers/appointments/create')).waitFor({ state: 'visible' });
        await this.page.locator(this.locators.a_href('/sellers/appointments/create')).click();
    }
    async inputManufacturedYear() {
        await this.page.locator(this.locators.input_id('sellerAppointmentForm_licence_plate_number')).click();
    }
    async inputCarplate(Carplate: string) {
        await this.page.locator(this.locators.input_id('sellerAppointmentForm_licence_plate_number')).fill(Carplate);
    }
    async getTitleByObj(locator: string) {
        const title = await this.page.locator(locator).getAttribute('title') || ''; //could be null
        return title;
    }

    async SelectApptDate_Tomorrow() {
        await this.page.locator(this.locators.input_id('sellerAppointmentForm_start_time_full')).click();
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
    
    async SelectApptTime() {
        await this.page.locator(this.locators.input_id('sellerAppointmentForm_time_slot')).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('//div[@class="ant-select-item ant-select-item-option ant-select-item-option-active"]//div[contains(.,"Slot")]').first().click();
    }
    async clickSubmitDealer() {
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.locators.btn_text('Submit')).click();
        await this.page.waitForTimeout(5000);
    }

    getValidLocator = async (selector: string,typeId: number, opt?: { idxInput?: number, idxOption?: number }): Promise<Locator> => {
        const locator = this.page.locator(selector)
        const count = await locator.count()

        // early return if only one index or not found
        if (count <= 1) {
            return locator
        }

        console.log(`[getValidLocator] warn: Unexpected html has ${count} tag html ${selector}`)

        let idx = 0
        switch (typeId) {
            case 1 :
                if (opt != null && opt.idxInput != null){
                    idx = opt.idxInput
                }
                break;
            case 2:
                if (opt != null && opt.idxOption != null){
                    idx = opt.idxOption
                }
            default:
                break;
        }

        return locator.nth(idx)
    }
}