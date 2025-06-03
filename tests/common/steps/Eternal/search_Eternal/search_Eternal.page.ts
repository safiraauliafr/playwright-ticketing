import { Page , expect} from '@playwright/test';

export class SearchEternalPage {
    private page: Page;    

    constructor(page: Page) {
        this.page = page;
    }

    async SearchByType(type:string,carplate:string){
        
        await this.page.locator('//div[starts-with(@class,"ticket-search ")]//div[@class="ant-select-selector"]').click();
        await this.page.locator(`//div[@role="option" and .="${type}"]`).click();
        await this.page.locator('//div[starts-with(@class,"ticket-search ")]//input[@type="text"]').fill(carplate);
        await this.page.locator('//div[starts-with(@class,"ticket-search ")]//button').click();
        await this.page.locator('//div[@class="ant-spin-container ant-spin-blur"]').waitFor({state:'hidden'});
    }





}