import { Page, Locator, expect } from "@playwright/test";
import { basepage } from "./basepage";
import { logger } from "../utilites/logger";

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
        this.completedPercentage = page.locator('[name="percentCompleted"]');
        this.addbtn = page.locator('button:has-text("ADD")');
        this.empidfilter = page.locator("table thead tr").nth(1).locator("input").nth(1);

        this.page.on("dialog", async (dialog) => {
            this.lastDialogMessage = dialog.message();
            logger.info(`Dialog appeared with message: "${dialog.message()}"`);
            await dialog.accept();
        });
    }

    async fillAddTrainingForm(data: any) {
        try {
            logger.info(`Filling Add Training form with data: ${JSON.stringify(data)}`);

            await this.fillInput(this.projectName, data.projectName);
            await this.fillInput(this.empId, data.empId);
            await this.fillInput(this.employeeName, data.employeeName);
            await this.fillInput(this.course, data.course);
            await this.fillInput(this.trainerName, data.trainerName);

            if (data.trainingType) {
                await this.trainingType.click();
                await this.page.getByRole('option', { name: data.trainingType, exact: true }).click();
                logger.info(`Selected Training Type: ${data.trainingType}`);
            }

            await this.fillInput(this.startDate, data.startDate);
            await this.fillInput(this.endDate, data.endDate);

            if (data.status) {
                await this.selectStatus(data.status);
            }

            if (data.completedPercentage !== undefined) {
                await this.fillInput(this.completedPercentage, data.completedPercentage);
            }

            logger.info("Add Training form filled successfully");
        } catch (error) {
            logger.error(`Failed to fill Add Training form: ${error}`);
            throw error;
        }
    }

    async selectTrainingType(trainingType: string) {
        try {
            logger.info(`Selecting Training Type: ${trainingType}`);
            await this.trainingType.click();
            await this.page.getByRole("option", { name: trainingType }).click();
        } catch (error) {
            logger.error(`Failed to select Training Type "${trainingType}": ${error}`);
            throw error;
        }
    }

    async selectStatus(status: string) {
        try {
            logger.info(`Selecting Status: ${status}`);
            await this.status.click();
            await this.page.getByRole("option", { name: status }).click();
        } catch (error) {
            logger.error(`Failed to select Status "${status}": ${error}`);
            throw error;
        }
    }

    async clickAddButton() {
        try {
            this.lastDialogMessage = ""; // reset before each click
            logger.info("Clicking the ADD button");
            await this.click(this.addbtn);
            // give the native dialog a brief moment to fire and be auto-accepted
            await this.page.waitForTimeout(500);
            logger.info("ADD button clicked successfully");
        } catch (error) {
            logger.error(`Failed to click ADD button: ${error}`);
            throw error;
        }
    }

    async searchEmployeeId(empId: string) {
        try {
            logger.info(`Searching for Employee ID: ${empId}`);

            // Make sure the table header has rendered/re-rendered before inspecting it
            const headerRow = this.page.locator("table thead tr").first();
            await headerRow.waitFor({ state: "visible" });

            const headers = this.page.locator("table thead th");
            await expect(headers.first()).toBeVisible(); // extra safety, ensures at least 1 exists

            const count = await headers.count();
            let empIdColumnIndex = -1;

            for (let i = 0; i < count; i++) {
                const text = (await headers.nth(i).innerText()).trim();
                if (text.toUpperCase() === "EMP ID") {
                    empIdColumnIndex = i;
                    break;
                }
            }

            if (empIdColumnIndex === -1) {
                logger.error("EMP ID column header not found in table");
                throw new Error("EMP ID column header not found");
            }

            logger.info(`EMP ID column found at index: ${empIdColumnIndex}`);

            const filterInput = this.page
                .locator("table thead tr")
                .nth(1)
                .locator("input")
                .nth(empIdColumnIndex);

            await filterInput.waitFor({ state: "visible" });
            await filterInput.fill(empId);

            // let the grid apply the filter before you move to verification
            await expect(this.page.locator("tbody tr").first()).toBeVisible();

            logger.info(`Employee ID "${empId}" searched successfully`);
        } catch (error) {
            logger.error(`Failed to search Employee ID "${empId}": ${error}`);
            throw error;
        }
    }

    async verifyEmployeeId(empId: string) {
        try {
            logger.info(`Verifying Employee ID: ${empId}`);
            const employeeRow = this.page.locator("tbody tr").filter({ hasText: empId });
            await expect(employeeRow.first()).toBeVisible({ timeout: 5000 });
            await expect(employeeRow.first()).toContainText(empId);
            logger.info(`Employee ID "${empId}" verified successfully`);
        } catch (error) {
            logger.error(`Failed to verify Employee ID "${empId}": ${error}`);
            throw error;
        }
    }

    async verifyValidationAlert(message: string) {
        try {
            logger.info(`Verifying validation alert message: "${message}"`);
            expect(this.lastDialogMessage).toBe(message);
            logger.info("Validation alert verified successfully");
        } catch (error) {
            logger.error(`Validation alert mismatch. Expected: "${message}", Actual: "${this.lastDialogMessage}". Error: ${error}`);
            throw error;
        }
    }
}