import { Page, expect } from '@playwright/test';
import { SearchEternalPage } from './pages/search_Eternal.page';
import { DetailEternalPage } from './pages/detail_Eternal.page';
import { IndexEternalPage } from './pages/index_Eternal.page';
import { SideBarEternalPage } from './pages/sidebar_Eternal.page';
import { BasePage } from '@basepage';
import { BrowserUtils } from '@utils/browser-utils';
import { config } from '@config';
import { LoginStep } from '@common/steps/Login/login-steps'

export class EternalStep extends BasePage{
    private search: SearchEternalPage;
    private index: IndexEternalPage;
    private detail: DetailEternalPage;
    private sidebar: SideBarEternalPage;
    private browser: BrowserUtils;
    private Login: LoginStep;

    constructor(page: Page) {
        super(page);
        this.search = new SearchEternalPage(page);
        this.index = new IndexEternalPage(page);
        this.detail = new DetailEternalPage(page);
        this.sidebar = new SideBarEternalPage(page);
        this.browser = new BrowserUtils(page);
        this.Login = new LoginStep(page);
    }

    //Search
    async SearchBy_Carplate(carplate:string){
        await this.search.SearchByType('Car Plate', carplate);
    }

    //Index
    async Click_LinkToTicket(carplate:string){
        await this.index.Click_LinkToTicket(carplate);
    }

    //Detail
    async BackToOverview(){
        await this.detail.Click_BackToOverview();
    }

    //Sidebar
    /**
     * This step will navigate to captain page from eternal page
     * A new tab will be opened
     */
    async NavigateToCaptainFromEternal(){
        await this.sidebar.ClickCaptainLogo();
    }

    async NavToEternalByUrl(){
        await this.page.goto(config.domains.eternal.baseUrl)
        await this.Login.CheckIfLoginNeeded()
        await this.browser.waitForPageLoad()
    }
}