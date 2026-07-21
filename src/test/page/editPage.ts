import { Page, Locator } from "@playwright/test";
import { basepage } from "./basepage";
import { getEnv } from "../utilites/envReader";

export class editPage extends basepage {

    readonly search:Locator;
    readonly editIcon: Locator;
    readonly employeeName: Locator;
    readonly projectName: Locator;
    readonly trainingType: Locator;
    readonly trainerName: Locator;
    readonly updateButton: Locator;
    readonly name: Locator;

    constructor(page: Page) {
        super(page);
        this.search = page.locator('[id="_r_7_"]');
        this.editIcon = page.locator("button[aria-label='edit'] svg");

        this.employeeName = page.locator("//input[@name='employeeName']");
        this.projectName = page.locator("//input[@name='course']");
        this.trainingType = page.locator("//input[@name='trainingType']");
        this.trainerName = page.locator("//input[@name='trainerName']");

        this.updateButton = page.getByRole("button", { name: "Update" });

        this.name = page.locator('[id="_r_8_"]');
    }

    async navigate(){
        getEnv()
        await this.page.goto(process.env.baseurl!,{waitUntil:'networkidle'})
    }

    async clickEditIcon(id:string) {
        await this.search.fill(id);
        await this.click(this.editIcon);
    }

    async editEmployeeName(name: string) {
        await this.employeeName.clear();
        await this.employeeName.fill(name);
    }

    async editProjectName(project: string) {
        await this.projectName.clear();
        await this.projectName.fill(project);
    }

    async editTrainingType(training: string) {
        await this.trainingType.clear();
        await this.trainingType.fill(training);
    }

    async editTrainerName(trainer: string) {
        await this.trainerName.clear();
        await this.trainerName.fill(trainer);
    }

    async clickUpdateButton() {
        await this.click(this.updateButton);
    }

}