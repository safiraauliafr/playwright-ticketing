import { Page , expect} from '@playwright/test';

export class SearchEternalPage {
    private page: Page;    

    constructor(page: Page) {
        this.page = page;
    }

    locators = {
        dropdown_Search: '//div[starts-with(@class,"ticket-search ")]//div[@class="ant-select-selector"]',
        option_Dropdown: (variable:string)=>`//div[@role="option" and .="${variable}"]`,
        input_Search: '//div[starts-with(@class,"ticket-search ")]//input[@type="text"]',
        icon_Search: '//div[starts-with(@class,"ticket-search ")]//button',
        searchLoading: '//div[@class="ant-spin-container ant-spin-blur"]',
    }

    async SearchByType(type:string,carplate:string){
        
        await this.page.locator(this.locators.dropdown_Search).click();
        await this.page.locator(this.locators.option_Dropdown(type)).click();
        await this.page.locator(this.locators.input_Search).fill(carplate);
        await this.page.locator(this.locators.icon_Search).click();
        await expect(this.page.locator('xpath='+this.locators.searchLoading)).not.toBeVisible({timeout:10000});
    }





}