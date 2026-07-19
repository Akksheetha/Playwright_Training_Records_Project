import { Locator, Page } from "@playwright/test";

export class basepage{

    protected page:Page

    constructor(page:Page){
        this.page=page
    }

    async click(locator:Locator){
        await locator.click()
    }
    async getText(locator:Locator){
        await locator.textContent() 
    }

    async locator(locator:Locator){
        return await(locator)
    }
}