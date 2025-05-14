import { Page , expect} from '@playwright/test';

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
        return this.page.frameLocator('iframe[src*="/tickets-shared/create"]');
    }
    async clickBtnNewTicket() {
        const iframe = await this.getIframe();
        await this.page.locator('button:has(:text-is("New Ticket"))').click();
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
    }

    async selectSellerType(sellerType:string){
        const iframe = await this.getIframe();
        await iframe.locator('//div[starts-with(@class,"SellerTypeSelector__StyledWrapper-")]').click();
        await iframe.locator('//div[starts-with(@class,"SellerTypeSelector__StyledWrapper-")]//input').fill(sellerType);
        await iframe.locator(this.locators.li_option(sellerType)).click();
    }
    async selectFromDropdown(id:string,value:string){
        const iframe = await this.getIframe();
        await iframe.locator(this.locators.div_id(id)).click();
        await iframe.locator(this.locators.input_id(id)).fill(value);
        await expect(iframe.locator('xpath='+this.locators.li_option(value))).toBeVisible({timeout:7000});
        await iframe.locator(this.locators.li_option(value)).click();
    }

    //CompanyName
    async selectCompanyName(companyName:string){
        await this.selectFromDropdown('additional_data.company_id',companyName);
    }
    //Name
    async selectName(name:string){
        const iframe = await this.getIframe();
        await iframe.locator('//div[@id="additional_data.user_id"]').click();
        await iframe.locator('//input[@id="additional_data.user_id"]').fill(name);
        await expect(iframe.locator(`//li[./*[contains(.,"${name}")]]`)).toBeVisible({timeout:7000});
        await iframe.locator(`//li[./*[contains(.,"${name}")]]`).click();
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
        await iframe.locator('button:has(:text-is("Add New"))').click();
        const msg = '*:has-text("Ticket created successfully!")'
        await expect(iframe.locator(msg)).toBeVisible({timeout:10000});
        const getticketID = await iframe.locator(msg).textContent() || '';
        const TicketID = getticketID?.split('ID: ')[1].trim();
        console.log(TicketID);
        return TicketID;
    }
    async verify_TicketCreatedSuccessfulNotif(ticketID:string){
        await expect(this.page.locator('*:text-is("Success!")')).toBeVisible({timeout:10000});
        await expect(this.page.locator(`*:text-is("Ticket ${ticketID} has been created.")`)).toBeVisible({timeout:10000});
    }
}