import { Locator } from "@playwright/test";
import { basepage } from "./basepage";
import { Page } from "@playwright/test";
export class addTrainner extends basepage {

   
    private add:Locator;
    private projectname:Locator
    private EmpID:Locator
    private empName:Locator
    private course:Locator
    private trainnerName:Locator
    private trainnerType:Locator
    private startDate:Locator
    private EndDate:Locator
    private status:Locator
    private  complete:Locator

    constructor(page:Page){
        super(page)
        this.add=page.locator("//button[@aria-label='Add Training']")
        this.projectname=page.locator("aria-haspopup='listbox'")
        this.EmpID = page.locator("//input[@id='_r_4d_']")
        this.empName=page.locator("//input[@id='_r_4d_']")
        this.course= page.locator("//input[@id='_r_4f_']")

    }

}