import { Page, Locator, expect } from "@playwright/test";
import { basepage } from "./basepage";

export class AddPage extends basepage {
    readonly plusIcon: Locator;
    readonly projectName: Locator;
    readonly empId: Locator;
    readonly employeeName: Locator;
    readonly course: Locator;
    readonly trainerName: Locator;
    readonly trainingType: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly status: Locator;
    readonly completedPercentage: Locator;
    readonly addbtn: Locator;
    readonly empidfilter: Locator;

    private lastDialogMessage: string = "";

    constructor(page: Page) {
        super(page);
        this.plusIcon = page.locator("//button[@aria-label='Add Training']//*[name()='svg']");
        this.projectName = page.locator("//input[@name='projectName']");
        this.empId = page.locator("//input[@name='empId']");
        this.employeeName = page.locator("//input[@name='employeeName']");
        this.course = page.locator("//input[@name='course']");
        this.trainerName = page.locator("//input[@name='trainerName']");
        this.trainingType = page.getByLabel('Training Type');
        this.status = page.getByLabel('Status');
        this.startDate = page.getByLabel('Start Date');
        this.endDate = page.getByLabel('End Date');
        this.empidfilter = page.locator('input').filter({ hasText: '' }); // see below, use label instead
        this.completedPercentage =page.locator('[name="percentCompleted"]')
        this.addbtn = page.locator('button:has-text("ADD")')
        this.empidfilter = page.locator("table thead tr").nth(1).locator("input").nth(1);
       
        this.page.on("dialog", async (dialog) => {
            this.lastDialogMessage = dialog.message();
            await dialog.accept();
        });
    }

   async fillAddTrainingForm(data: any) {
    await this.fillInput(this.projectName, data.projectName);
    await this.fillInput(this.empId, data.empId);
    await this.fillInput(this.employeeName, data.employeeName);
    await this.fillInput(this.course, data.course);
    await this.fillInput(this.trainerName, data.trainerName);

    if (data.trainingType) {
        await this.trainingType.click();
        await this.page.getByRole('option', { name: data.trainingType, exact: true }).click();
    }

    await this.fillInput(this.startDate, data.startDate);
    await this.fillInput(this.endDate, data.endDate);

    if (data.status) {
        await this.selectStatus(data.status);
    }

    if (data.completedPercentage !== undefined) {
        await this.fillInput(this.completedPercentage, data.completedPercentage);
    }
}
    async selectTrainingType(trainingType: string) {
        await this.trainingType.click();
        await this.page.getByRole("option", { name: trainingType }).click();
    }

    async selectStatus(status: string) {
        await this.status.click();
        await this.page.getByRole("option", { name: status }).click();
    }

    async clickAddButton() {
        this.lastDialogMessage = ""; // reset before each click
        await this.click(this.addbtn);
        // give the native dialog a brief moment to fire and be auto-accepted
        await this.page.waitForTimeout(500);
    }

   async searchEmployeeId(empId: string) {
    const headers = this.page.locator("table thead th");
    const count = await headers.count();
    let empIdColumnIndex = -1;

    for (let i = 0; i < count; i++) {
        const text = await headers.nth(i).innerText();
        if (text.trim() === "EMP ID") {
            empIdColumnIndex = i;
            break;
        }
    }

    if (empIdColumnIndex === -1) {
        throw new Error("EMP ID column header not found");
    }

    // The filter row is typically the row right after/inside the header
    const filterInput = this.page
        .locator("table thead tr")
        .nth(1) // adjust if filter row is a different row index
        .locator("input")
        .nth(empIdColumnIndex);

    await filterInput.fill(empId);
}
    async verifyEmployeeId(empId: string) {
        const employeeRow = this.page.locator("tbody tr").filter({ hasText: empId });
        await expect(employeeRow).toContainText(empId);
    }
    

    async verifyValidationAlert(message: string) {
        expect(this.lastDialogMessage).toBe(message);
    }
}