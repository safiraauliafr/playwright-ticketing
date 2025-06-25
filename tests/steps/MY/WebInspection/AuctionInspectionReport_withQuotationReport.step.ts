import { Page } from '@playwright/test';
import { WebInspectionPage } from './WebInspection.page';
import { BrowserUtils } from '@utils/browser-utils';
import { config } from '@config';
import { EternalStep } from '@common/steps/Eternal/eternal.step';
import { TicketIndexPage } from '@steps/MY/Eternal/Ticketing/TicketIndexpage/TicketIndexpage.page';
import { TicketDetailsPage } from '@steps/MY/Eternal/Ticketing/TicketDetailspage/TicketDetailspage.page';

export class AuctionInspectionReport_withQuotationReportStep {
    private insp: WebInspectionPage;
    private browser: BrowserUtils;
    private eternal: EternalStep;
    private index: TicketIndexPage;
    private detail: TicketDetailsPage;
    private page: Page;

    constructor(page: Page) {
        this.insp = new WebInspectionPage(page);
        this.browser = new BrowserUtils(page);
        this.eternal = new EternalStep(page);
        this.index = new TicketIndexPage(page);
        this.detail = new TicketDetailsPage(page);
        this.page = page;
    }

    async ContinueInspection_AuctionReport_fromQuotation(){
        const carplate = config.testData.car.carPlate;

        //Complete report in In Progress tab
        await this.insp.SearchInspectionByCarplate('In Progress',carplate);
        await this.insp.verifyInspectionCardPresent(carplate);
        await this.insp.clickContinueButton(carplate);

        //Car Photo
        await this.insp.verifyPageTitlePresent('Car Photo');
        await this.page.waitForTimeout(1000);
        await this.insp.clickNextButton();

        //Engine Sound AI Analysis
        await this.insp.verifyPageTitlePresent('Engine Sound AI Analysis');
        await this.page.waitForTimeout(1000);
        await this.insp.uploadEngineSound();
        await this.insp.clickNextButton();

        //Interior
        await this.insp.verifyPageTitlePresent('Interior');
        await this.page.waitForTimeout(1000);
        await this.insp.clickPassButton();
        await this.page.waitForTimeout(1000);
        await this.browser.scrollToTop();
        await this.insp.uploadMandatoryDocument();
        await this.page.waitForTimeout(1000);
        await this.insp.clickNextButton();

        //Under The Hood
        await this.insp.verifyPageTitlePresent('Under The Hood');
        await this.page.waitForTimeout(1000);
        await this.insp.clickPassButton();
        await this.page.waitForTimeout(1000);
        await this.browser.scrollToTop();
        await this.insp.uploadMandatoryDocument();
        await this.page.waitForTimeout(1000);
        await this.insp.clickNextButton();

        //Exterior
        await this.insp.verifyPageTitlePresent('Exterior');
        await this.page.waitForTimeout(1000);
        await this.insp.clickPassButton();
        await this.page.waitForTimeout(1000);
        await this.browser.scrollToTop();
        await this.insp.uploadMandatoryDocument();
        await this.page.waitForTimeout(1000);
        await this.insp.clickNextButton();

        //Underbody
        await this.insp.verifyPageTitlePresent('Underbody');
        await this.page.waitForTimeout(1000);
        await this.insp.clickPassButton();
        await this.page.waitForTimeout(1000);
        await this.browser.scrollToTop();
        await this.insp.uploadMandatoryDocument();
        await this.page.waitForTimeout(1000);
        await this.insp.clickNextButton();

        //Road Test
        await this.insp.verifyPageTitlePresent('Road Test');
        await this.page.waitForTimeout(1000);
        await this.insp.clickPassButton();
        await this.page.waitForTimeout(1000);
        await this.insp.clickNextButton();

        //Car Information
        await this.insp.verifyPageTitlePresent('Car Information');
        await this.page.waitForTimeout(1000);
        await this.insp.clickToggleButtonByFieldName('Plate No. (Sell with/Sell without).', 'Sell With');
        await this.insp.clickDropdownByFieldName('Base Color', 'Beige');
        await this.insp.clickToggleButtonByFieldName('Registration Card', 'New');
        await this.insp.clickDropdownByFieldName('Registration Type', 'Private');
        await this.insp.selectRegistrationDate();
        await this.insp.inputByFieldName('Seat Number', '5');
        await this.insp.clickToggleButtonByFieldName('AP Form', 'N/A');
        await this.page.waitForTimeout(2000);
        await this.insp.clickNextButton();

        //Other information
        await this.insp.verifyPageTitlePresent('Other information');
        await this.page.waitForTimeout(1000);
        await this.insp.clickToggleButtonByFieldName('B5 Form', 'No');

        //Submit Inspection report
        await this.insp.clickSubmitButton();
        await this.insp.verifyPageTitle_WebInspection();

        //Report in Pending Verification Tab
        await this.insp.SearchInspectionByCarplate('Pending Verification',carplate);
        await this.insp.verifyInspectionCardPresent(carplate);
        await this.page.waitForTimeout(2000);

        //Navigate To Eternal
        await this.browser.navigateToUrl(config.domains.eternal.baseUrl);
        await this.browser.waitForPageLoad(10000);

        //Ticket Index page
        await this.eternal.SearchBy_Carplate(carplate);
        await this.index.Verify_TicketPresent(carplate);
        await this.index.Verify_TicketStatus(carplate,'Pending Quotation');
        await this.index.Verify_AppointmentStatus(carplate,'Successful');
        await this.index.Verify_InspectionStatus(carplate,'Pending Verification');   
        await this.index.VerifyEmpty_Quotation(carplate);
        await this.page.waitForTimeout(2000);    

        //Ticket Details page
        await this.index.ClickLinkToTicketDetails(carplate);
        // Header
        await this.detail.VerifySidebar_TicketStatus('Pending Quotation');

        //Sell Workflow
        await this.detail.ClickSellWorkflowTab();
        //1. Create Appointment
        await this.detail.VerifySectionStatus('1. Create appointment','Complete');

        //2. Obtain Valuation
        await this.detail.VerifySectionStatus('2. Obtain valuation','In Progress');
        await this.detail.VerifyAuctInspectionStatus('Pending Verification');
        await this.detail.VerifyQuotationStatus('To Quote');
        await this.detail.VerifyQuotationInspectionStatus('Completed');
        
        //3. Transaction
        await this.detail.VerifySectionStatus('3. Transaction','Next Steps');
        await this.detail.ClickMainSection('3. Transaction');
        await this.detail.VerifyTransaction_Blank();
        await this.page.waitForTimeout(2000);

        //Back To Web Inspection
        await this.browser.navigateToUrl(config.domains.captain.baseUrl+"inspection-app")
        await this.page.waitForTimeout(3000);
        await this.insp.verifyPageTitle_WebInspection();
        await this.page.waitForTimeout(2000);

    }

    async VerifyInspection_AuctionReport_withQuotation(){

        const carplate = config.testData.car.carPlate;

        await this.insp.SearchInspectionByCarplate('Pending Verification',carplate);
        await this.insp.verifyInspectionCardPresent(carplate);
        await this.page.waitForTimeout(2000);

        //Click Verify Inspection Report
        await this.insp.verifyInspectionReport(carplate);
        await this.insp.SearchInspectionByCarplate('Verified',carplate);
        await this.insp.verifyInspectionCardPresent(carplate);
        await this.insp.verifyInspectionCardStatus(carplate,'Pending Quotation');


    }

}