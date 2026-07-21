import { setWorldConstructor,World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { filterPage } from "../page/filterPage";
import { AddPage } from "../page/AddPage";

export class customWorld extends World{
    browser!:Browser
    context!:BrowserContext
    page!:Page
    filter!:filterPage
    addpage!:AddPage
}
 setWorldConstructor(customWorld)