import {Page, Locator } from "@playwright/test";
import { basepage } from "./basepage";
import { getEnv } from "../utilites/envReader";
//1
export class filterPage extends basepage{
    readonly filter:Locator
    readonly projectName:Locator
    readonly projectText :Locator
    readonly filterTrainning:Locator
    readonly trainingType:Locator
    readonly TrainigTypeText:Locator

    constructor(page:Page){
        super(page)
        this.filter= page.locator("(//li[@role='menuitem'])[1]")
        this.projectName=page.locator("//li[@data-value='ABC']")
        this.projectText=page.locator("//tr[1][@class='MuiTableRow-root css-10x2zbj']//td[1]")
        this.filterTrainning=page.locator("(//li[@role='menuitem'])[2]")
        this.trainingType=page.locator("//li[@data-value='Udemy']")
        this.TrainigTypeText=page.locator("//tr[1][@class='MuiTableRow-root css-10x2zbj']//td[6]")
    }

    async navigate(){
        getEnv()
        await this.page.goto(process.env.baseurl!,{waitUntil:'networkidle'})
    }

    async clickFilter(){
        await this.click(this.filter)
    }

    async clickprojectName(){
        await this.click(this.projectName)
    }
    async textProjectName(){
        return (await this.locator(this.projectText))
    }
    async clickTrainingFilter(){
       await this.click(this.filterTrainning)
    }
    async clickTainingType(){
        await this.click(this.trainingType)
    }

    async TextTraining(){
      return (await this.locator(this.TrainigTypeText))
    }
}