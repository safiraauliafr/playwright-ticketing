import { Page } from '@playwright/test';
import { WebInspectionPage } from './WebInspection.page';
import { config } from '@config';
import { BrowserUtils} from '@common/utils/browser-utils'
import { EternalStep } from '@common/steps/Eternal/eternal.step';
import { TicketIndexPage } from '@steps/MY/Eternal/Ticketing/TicketIndexpage/TicketIndexpage.page';
import { TicketDetailsPage } from '@steps/MY/Eternal/Ticketing/TicketDetailspage/TicketDetailspage.page';

export class QuotationInspectionReportStep {
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

    async StartInspection_QuotationReport(){
        const carplate = config.testData.car.carPlate;
        await this.insp.clickStartButton(carplate);
        await this.insp.uploadCarPhoto('Front','1.jpg');
        await this.insp.uploadCarPhoto('Front Left','2.jpg');
        await this.insp.uploadCarPhoto('Front Right','3.jpg');
        await this.insp.uploadCarPhoto('Rear','4.jpg');
        await this.insp.uploadCarPhoto('Rear Left','5.jpg');
        await this.insp.uploadCarPhoto('Rear Right','6.jpg');
        await this.browser.goBack();
        await this.insp.SearchInspectionByCarplate('In Progress',carplate);
        await this.insp.verifyInspectionCardPresent(carplate);
        
        //Verify status in Eternal
        await this.browser.navigateToUrl(config.domains.eternal.baseUrl);
        await this.browser.waitForPageLoad(10000);
        await this.eternal.SearchBy_Carplate(carplate);
        await this.index.Verify_TicketPresent(carplate);
        await this.index.Verify_TicketStatus(carplate,'Pending Quotation');
        await this.index.Verify_AppointmentStatus(carplate,'Successful');
        await this.index.Verify_InspectionStatus(carplate,'Draft');        
        await this.index.ClickLinkToTicketDetails(carplate);
        // Header
        await this.detail.VerifySidebar_TicketStatus('Pending Quotation');
        await this.detail.ClickSellWorkflowTab();
        //1. Create Appointment
        await this.detail.VerifySectionStatus('1. Create appointment','Complete');
        await this.detail.ClickMainSection('1. Create appointment');
        await this.detail.VerifyAuctInspectionApptStatus('Successful');
        //2. Obtain Valuation
        await this.detail.VerifySectionStatus('2. Obtain valuation','In Progress');
        await this.detail.VerifyQuotationStatus('Draft');
        await this.detail.VerifyAuctionInspection_Blank();
        //3. Transaction
        await this.detail.VerifySectionStatus('3. Transaction','In Progress');
        await this.detail.ClickMainSection('3. Transaction');
        await this.detail.VerifyTransaction_Blank();

        //Back To Web Inspection
        await this.browser.navigateToUrl(config.domains.captain.baseUrl+"inspection-app")
        await this.insp.verifyPageTitle_WebInspection();
        await this.page.waitForTimeout(2000);

    }

    async CompleteInspection_QuotationReport(){
        const carplate = config.testData.car.carPlate;
        await this.insp.SearchInspectionByCarplate('In Progress',carplate);
        await this.insp.verifyInspectionCardPresent(carplate);
        await this.insp.clickContinueButton(carplate);
        await this.insp.clickToggleButtonByFieldName('AP Kastam Document','N/A');
        await this.insp.clickToggleButtonByFieldName('Transmission','Automatic');
        await this.insp.clickDropdownByFieldName('Fuel type','Petrol');
        await this.insp.inputByFieldName('Engine Capacity','1500');
        await this.insp.inputByFieldName('Mileage','15000');
        await this.insp.clickToggleButtonByFieldName('Risk','Low');
        await this.insp.clickToggleButtonByFieldName('E-Hailing','No');
        await this.browser.scrollToTop();
        await this.insp.uploadMandatoryDocument();
        await this.insp.clickNextButton();
    }
}