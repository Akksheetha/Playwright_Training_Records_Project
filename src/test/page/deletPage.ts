import { Page, Locator } from "@playwright/test";
import { basepage } from "./basepage";
import { getEnv } from "../utilites/envReader";

export class deletePage extends basepage {

    readonly employeeNameFilter: Locator;
    readonly deleteIcon: Locator;
    readonly confirmButton: Locator;

    constructor(page: Page) {
        super(page);
        this.employeeNameFilter = page.locator('[id="_r_8_"]');
        this.deleteIcon = page.locator("button[aria-label='delete'] svg");
        this.confirmButton = page.getByRole("button", { name: "Yes" });
    }

    async navigate() {
        getEnv()
        await this.page.goto(process.env.baseurl!, { waitUntil: 'networkidle' })
    }

    async filterByEmployeeName(name: string) {
        await this.employeeNameFilter.fill(name);
    }

    async clickDeleteIcon() {
        await this.click(this.deleteIcon);
    }

    async clickConfirmButton() {
        await this.click(this.confirmButton);
    }

}