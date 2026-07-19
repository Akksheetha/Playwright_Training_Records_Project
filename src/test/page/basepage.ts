import { Page } from "@playwright/test";

export class basepage{

    protected page:Page

    constructor(page:Page){
        this.page=page
    }
}