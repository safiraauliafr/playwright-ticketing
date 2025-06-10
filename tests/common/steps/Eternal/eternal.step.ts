import { Page, expect } from '@playwright/test';
import { SearchEternalPage } from './pages/search_Eternal.page';
import { DetailEternalPage } from './pages/detail_Eternal.page';
import { IndexEternal } from './pages/index_Eternal.page';


export class EternalStep {
    private search: SearchEternalPage;
    private index: IndexEternal;
    private detail: DetailEternalPage;
    

    constructor(page: Page) {
        this.search = new SearchEternalPage(page);
        this.index = new IndexEternal(page);
        this.detail = new DetailEternalPage(page);
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
}