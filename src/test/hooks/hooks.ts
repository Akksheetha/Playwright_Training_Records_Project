import { Before,BeforeAll,After,AfterAll } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import { customWorld } from "../world/customWorrld";
import { Status } from "@cucumber/cucumber";
import { filterPage } from "../page/filterPage";


let browser:Browser
BeforeAll(async()=>{
    browser= await chromium.launch({headless:true})
})

Before(async function(this:customWorld){
    this.browser=browser
    this.context=await this.browser.newContext()
    this.page= await this.context.newPage()
    this.filter=new filterPage(this.page)

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