import { Page , expect} from '@playwright/test';
import { config } from '@config';
import { BasePage } from '@basepage';
import { time } from 'console';

/**
 * This class is for all page objects related to Web Inspection index & report pages
 */

export class WebInspectionPage  extends BasePage {
    constructor(page: Page) {
        super(page);       
    }

    //Index Page   
    async verifyPageTitle_WebInspection(){
        await expect(this.page.locator('//p[.="Web Inspection"]')).toBeVisible();
    }

    async SearchInspectionByCarplate(tabName:string, carplate:string){
        await this.page.locator(`//div[@role="tab" and .="${tabName}"]`).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator('(//span[starts-with(@class,"ant-input-search Search__StyledSearch")]//input)[1]').fill(carplate);
        await this.page.waitForTimeout(1000);
        await this.page.locator('(//i[@aria-label="icon: search"])[1]').click();
        await this.page.waitForTimeout(3000); 
    }

    async verifyInspectionCardPresent(carplate:string){
        await expect(this.page.locator(`//div[contains(@class,'ant-list-item InspectionAppListContainer__StyledListItem') and .//*[text()="${carplate}"]]`)).toBeVisible();
    }
    async verifyInspectionCardStatus(carplate:string,status:string){
        await expect(this.page.locator(`//div[contains(@class,'InspectionCard') and .//*[text()="${carplate}"] and .//*[text()="${status}"]]`)).toBeVisible();
    }

    async clickStartButton(carplate:string){
        await this.page.locator(`//div[contains(@class,'InspectionAppointmentCard') and .//*[text()="${carplate}"]]//button[.="Start"]`).click();
        await this.page.waitForURL('**/inspection-app/**');
        await this.page.waitForTimeout(5000);
    }

    async clickContinueButton(carplate:string){
        await this.page.locator(`//div[contains(@class,'InspectionCard') and .//*[text()="${carplate}"]]//button[.="Continue"]`).click();
        await this.page.waitForURL('**/inspection-app/**');
        await this.page.waitForTimeout(5000);
    }

    /**
     * Back To Web Inspection Index page through burger menu
     */
    async BackToWebInspectionIndexPage(){
        await this.page.locator('//i[@class="anticon anticon-align-left"]').click();
        await this.page.locator('//a[@href="/inspection-app"]').click();
        await this.page.locator('//p[.="Web Inspection"]').isVisible({timeout: 5000});
    }

    /*-----Inspection Report-----------*/
    async uploadCarPhoto(label:string,fileName:string){
        const uploadBtn = `//*[@class="ant-upload-picture-card-wrapper" and .//*[text()="${label}"]]//input[@type="file"]`;
        await this.page.locator(uploadBtn).setInputFiles(config.files.uploadPath+`inspection-photo/${fileName}`);
        await this.page.waitForTimeout(1000);
    }

    
    /**
     * To click toggle button groups by field name
     * eg: -
     * fieldName: Transmission ,option: 'Automation'/'Manual'
     * fieldName: AP Kastam Document ,option: 'Complete'/'Incomplete'/'N/A'
    */    
    async clickToggleButtonByFieldName(fieldName:string, option:string){
        await this.page.locator(`//*[@class="inspection-control" and .//*[text()="${fieldName}"]]//label[.="${option}"]`).click();
    }

    /**
     * To select option from  dropdown by field name
    */
    async clickDropdownByFieldName(fieldName:string, option:string){
        await this.page.locator(`//div[text()='${fieldName}']/following-sibling::div//div[@role='combobox']`).click();
        await this.page.locator(`//li[.="${option}"]`).click();        
    }

    /*
        To input value to input field by field name
    */
   async inputByFieldName(fieldName:string, value:string){
    await this.page.locator(`//div[@class="inspection-control" and .//*[text()="${fieldName}"]]//input`).fill(value);

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
        const btnPass = '//div[@class="inspection-control"  and .//*[text()="* "]]//label[@class="ant-radio-button-wrapper" and .="Pass"]';
        const count = await this.page.locator(btnPass).count();

        for(let i=1; i<= count ; i++){
            await this.page.locator(btnPass).first().click();
        }       

    }

    /**
     * To Click 'Next' Button to direct to the next page of report
     */
    async clickNextButton(){
       await this.page.getByText('Next').click();
    }

    /**
     * To click 'Submit' Button to submit report
     */
    async clickSubmitButton(){
        await this.page.locator('//button[.="Submit"]').click();
    }

    /**
     * To verify Inspection Submitted message shown
     */
    async verifyInspectionSubmittedMessage(){
        await expect(this.page.locator('//div[text()="Success"]').first()).toBeVisible({timeout: 20000});
        await expect(this.page.locator('//div[text()="Inspection submitted"]').first()).toBeVisible({timeout: 20000});
    }

    /*
     * To verify page title
     */
    async verifyPageTitlePresent(title:string){
        await expect(this.page.locator(`//p[text()="${title}"]`)).toBeVisible({timeout: 20000});
    } 

    /**
     * To Upload mp3 file for Engine Sound
     */
    async uploadEngineSound(){
        await this.page.locator('//div[@class="inspection-control" and .//*[text()="Engine Sound"]]//input[@type="file"]').setInputFiles(config.files.uploadPath+`inspection-document/EngineSound.mp3`);
        await this.DocumentUploadedSuccessfullyMessage();
        await this.page.waitForTimeout(3000);
    }

    /**
     * msg: Document uploaded successfully!
     */
    async DocumentUploadedSuccessfullyMessage(){
        await expect(this.page.locator('//div[text()="Document uploaded successfully!"]')).toBeVisible({timeout: 10000});
        await this.page.waitForTimeout(2000);
    }

    /**
     * Select Registration Date
     */
    async selectRegistrationDate(){
       await this.page.locator('//div[@class="inspection-control" and .//*[text()="Registration Date"]]//input').click();
       await this.page.waitForTimeout(1000);
       await this.page.locator('//a[.="Today"]').click();
       await this.page.waitForTimeout(1000);
    }

    async verifyInspectionReport(carplate:string){
        await this.page.locator(`//div[contains(@class,'InspectionCard') and .//*[text()="${carplate}"]]//button[.="View Report"]`).click();
        const btnVerify = '//button[.="Verify"]';
        await this.page.locator(btnVerify).waitFor({state: 'visible',timeout:3000});
        await this.page.waitForTimeout(1000);
        await this.page.locator(btnVerify).click();
        await this.page.locator(btnVerify).waitFor({state: 'hidden',timeout:5000});
        await this.page.waitForTimeout(1000);
        await this.page.locator('//button[@class="ant-drawer-close"]').click();
        await this.page.waitForTimeout(2000);
        
    }

    

    

}