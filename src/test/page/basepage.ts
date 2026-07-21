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
     async fillInput(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async selectOption(locator: Locator, value: string) {
        await locator.selectOption({ label: value });
    }
     async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

}