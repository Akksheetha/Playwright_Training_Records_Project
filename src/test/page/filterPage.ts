import {Page, Locator } from "@playwright/test";
import { basepage } from "./basepage";
import { getEnv } from "../utilites/envReader";
import filterData from "../testData/filter.json";
import { logger } from "../utilites/logger";
//1
export class filterPage extends basepage{
    readonly filter:Locator
    readonly projectName:Locator
    readonly projectText :Locator
    readonly filterTrainning:Locator
    readonly trainingType:Locator
    readonly TrainigTypeText:Locator
    readonly EmpID_Box:Locator
    readonly EMPIDTEXT:Locator
    readonly EmpRecordCount:Locator

    constructor(page:Page){
        super(page)
        this.filter= page.locator("(//li[@role='menuitem'])[1]")
        this.projectName=page.locator("//li[@data-value='ABC']")
        this.projectText=page.locator("//tr[1][@class='MuiTableRow-root css-10x2zbj']//td[1]")
        this.filterTrainning=page.locator("(//li[@role='menuitem'])[2]")
        this.trainingType=page.locator("//li[@data-value='Udemy']")
        this.TrainigTypeText=page.locator("//tr[1][@class='MuiTableRow-root css-10x2zbj']//td[6]")
        this.EmpID_Box=page.locator("//input[@id='_r_7_']")
        this.EMPIDTEXT=page.locator("//tr[@class='MuiTableRow-root css-10x2zbj'][1]//td[2]")
        this.EmpRecordCount=page.locator("//tr[@class='MuiTableRow-root css-10x2zbj']")
    }

    async navigate(){
        getEnv()
        await this.page.goto(process.env.baseurl!,{waitUntil:'networkidle'})
        logger.info("Website is launched")
    }

    async clickFilter(){
        await this.click(this.filter)
        logger.info("filter is clicked")
    }

    async clickprojectName(){
        await this.click(this.projectName)
        logger.info("clikc the project name dropdown")
    }
    async textProjectName(){
        logger.info("project name is returned")
        return (await this.locator(this.projectText))
        
    }
    async clickTrainingFilter(){
       await this.click(this.filterTrainning)
       logger.info("click trainning Filter dropdown")
    }
    async clickTainingType(){
        logger.info("Clicked the trainnerType")
        await this.click(this.trainingType)
    }

    async TextTraining(){
        logger.info("return the training type")
      return (await this.locator(this.TrainigTypeText))
      
    }
  
    async clickEmpID(){
        logger.info("clicked the EmpID box")
        await this.click(this.EmpID_Box)
    }
    async empIDtext_enter(){
        logger.info("Enter the EMP iD")
        await this.fillInput(this.EmpID_Box,filterData.filter.empID)
    }
    async InvalidempIDtext_enter(){
        logger.info("Enter the invalid Emp ID")
        await this.fillInput(this.EmpID_Box,filterData.filter.InvalidEmpID)
    }
    async EMPID_TEXT(){
        logger.info("return the EMPID")
        return( await this.locator(this.EMPIDTEXT))
    }

    async countofEmpRecord(){
        let count = await this.EmpRecordCount.count()
        if(count<=0){
            logger.info("return 0 count ")
            return true
        }
        else{
            logger.info("return more then 0 count ")
            return false
        }
    }

}