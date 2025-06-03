import { Page , expect} from '@playwright/test';
import { TestDataManager } from '@utils/test-data-manager';

export class TicketCreationPage {
    private page: Page;    

    constructor(page: Page) {
        this.page = page;
    }

/*-----Locators-----------------------------------------------*/
    locators = {
        //dynamic locators
        li_option:(variable:string) => `//li[.="${variable}"]`,
        div_id:(variable:string) => `//div[@id="${variable}"]`,
        input_id:(variable:string) => `//input[@id="${variable}"]`,       
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
            if (await iframe.locator(this.locators.li_option(ticketType)).isVisible({timeout:2000})){
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
}