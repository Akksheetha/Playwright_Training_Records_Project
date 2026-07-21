import { setWorldConstructor,World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { filterPage } from "../page/filterPage";
import { editPage } from "../page/editPage";
import { deletePage } from "../page/deletPage";

export class customWorld extends World{
    browser!:Browser
    context!:BrowserContext
    page!:Page
    filter!:filterPage
    edit!: editPage
    delete!: deletePage
}
 setWorldConstructor(customWorld)