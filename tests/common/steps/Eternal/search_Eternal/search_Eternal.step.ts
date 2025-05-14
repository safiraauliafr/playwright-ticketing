import { Page, expect } from '@playwright/test';
import { SearchEternalPage } from './search_Eternal.page';


export class SearchEternalStep {
    private search: SearchEternalPage;

    constructor(page: Page) {
        this.search = new SearchEternalPage(page);
    }

    async SearchBy_Carplate(carplate:string){
        await this.search.SearchByType('Car Plate', carplate);
    }
}