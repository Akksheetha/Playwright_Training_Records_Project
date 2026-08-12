import { Before,BeforeAll,After,AfterAll,setDefaultTimeout} from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import { customWorld } from "../world/customWorrld";
import { Status } from "@cucumber/cucumber";
import { filterPage } from "../page/filterPage";
import { AddPage } from "../page/AddPage";
import { editPage } from "../page/editPage";
import {deletePage} from "../page/deletPage";
import { HomePage } from "../page/homepage";
setDefaultTimeout(30 * 1000);


let browser:Browser
BeforeAll(async()=>{
    browser= await chromium.launch({headless:false})
})

Before(async function(this:customWorld){
    this.browser=browser
    this.context=await this.browser.newContext()
    this.page= await this.context.newPage()
    this.filter=new filterPage(this.page)
    this.addpage=new AddPage(this.page);
    this.edit = new editPage(this.page);
    this.delete=new deletePage(this.page);
    this.homePage = new HomePage(this.page)
})

After(async function(this:customWorld,{result ,pickle}){

     if (result?.status === Status.FAILED) {
        const img = await this.page.screenshot({
            path: `Report/screenshort/${pickle.name}.png`,
            type: "png"
        });
    }
    await this.page.close()
    await this.context.close()

    
})

AfterAll(async()=>{
    await browser.close()
})