import { setWorldConstructor,World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Download, Page } from "@playwright/test";
import { filterPage } from "../page/filterPage";
import { editPage } from "../page/editPage";
import { deletePage } from "../page/deletPage";
import { HomePage } from "../page/homepage";

export class customWorld extends World{
    browser!:Browser
    context!:BrowserContext
    page!:Page
    filter!:filterPage
    edit!: editPage
    delete!: deletePage
    homePage !: HomePage
    download !: Download
}
 setWorldConstructor(customWorld)