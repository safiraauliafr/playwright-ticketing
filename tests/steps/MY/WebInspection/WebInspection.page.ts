import { Page , expect} from '@playwright/test';
import { config } from '@config';

/**
 * This class is for all page objects related to Web Inspection index & report pages
 */

export class WebInspectionPage {
    private page: Page; 

    constructor(page: Page) {
        this.page = page;        
    }

    //Index Page   
    async verifyPageTitle_WebInspection(){
        await expect(this.page.locator('//p[.="Web Inspection"]')).toBeVisible();
    }

    async SearchInspectionByCarplate(tabName:string, carplate:string){
        await this.page.getByText(tabName).click();
        await this.page.locator('//span[starts-with(@class,"ant-input-search Search__StyledSearch")]//input').first().fill(carplate);
        await this.page.locator('//i[@aria-label="icon: search"]').first().click();
    }

    async verifyInspectionCardPresent(carplate:string){
        await expect(this.page.locator(`//div[contains(@class,'ant-list-item InspectionAppListContainer__StyledListItem') and .//*[text()="${carplate}"]]`)).toBeVisible();
    }
    async clickStartButton(carplate:string){
        await this.page.locator(`//div[contains(@class,'InspectionAppointmentCard') and .//*[text()="${carplate}"]]//button[.="Start"]`).click();
        await this.page.waitForURL('**/inspection-app/**');
    }

    async clickContinueButton(carplate:string){
        await this.page.locator(`//div[contains(@class,'InspectionCard') and .//*[text()="${carplate}"]]//button[.="Continue"]`).click();
        await this.page.waitForURL('**/inspection-app/**');
    }

    /*-----Inspection Report-----------*/
    async uploadCarPhoto(label:string,fileName:string){
        await this.page.locator(`//*[@class="ant-upload-picture-card-wrapper" and.//*[text()="${label}"]]//input[@type="file"]`).setInputFiles(config.files.uploadPath+`inspection-photo/${fileName}`);
    }

    /*
        To click toggle button groups by field name
        eg: -
        fieldName: Transmission ,option: 'Automation'/'Manual'
        fieldName: AP Kastam Document ,option: 'Complete'/'Incomplete'/'N/A'
    */    
    async clickToggleButtonByFieldName(fieldName:string, option:string){
        await this.page.locator(`//*[@class="inspection-control" and .//*[text()="${fieldName}"]]//label[.="${option}"]`).click();
    }

    /*
        To select option from  dropdown by field name
    */
    async clickDropdownByFieldName(fieldName:string, option:string){
        await this.page.locator(`//div[text()='${fieldName}']/following-sibling::div//div[@role='combobox']`).click();
        await this.page.locator(`//li[.="${option}"]`).click();        
    }

    /*
        To input value to input field by field name
    */
   async inputByFieldName(fieldName:string, value:string){
    await this.page.locator(`//div[@class="inspection-control" and.//*[text()="${fieldName}"]]//input`).fill(value);

   }

    /* 
        Auto upload documents for all mandatory fields
    */
    async uploadMandatoryDocument(){
        const uploadBtn = '//div[@class="inspection-control" and .//*[text()="* "]]//input[@type="file"]';
        const count = await this.page.locator(uploadBtn).count();

        for(let i=0; i< count ; i++){
            await this.page.locator(uploadBtn).nth(i).setInputFiles(config.files.uploadPath+`inspection-document/documents.png`);
        }
    }

    /**
     * To click ALL 'Pass' button 
    */
    async clickPassButton(){
        const btnPass = `//*[@class = 'ant-radio-button-wrapper' and (text() = 'Pass' or. = 'Pass')]`;
        const count = await this.page.locator(btnPass).count();

        for(let i=1; i<= count ; i++){
            await this.page.locator(btnPass).first().click();
        }       

    }

    /**
     * To Click 'Next' Button
     */
    async clickNextButton(){
       await this.page.getByText('Next').click();
    }

    /**
     * To verify Inspection Submitted message shown
     */
    async verifyInspectionSubmittedMessage(){
        await expect(this.page.locator('//div[text()="Success"]')).toBeVisible();
        await expect(this.page.locator('//div[text()="Inspection submitted"]')).toBeVisible();
    }

    


}