import { setWorldConstructor,World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { filterPage } from "../page/filterPage";
import { editPage } from "../page/editPage";

export class customWorld extends World{
    browser!:Browser
    context!:BrowserContext
    page!:Page
    filter!:filterPage
    edit!: editPage
}
 setWorldConstructor(customWorld)