import { expect } from "@playwright/test";
import { When, Then } from "@cucumber/cucumber";
import { customWorld } from "../world/customWorrld";
import deleteData from "../testData/delete.json";
import { logger } from "../utilites/logger";

When("User filters the training record by employee name", async function (this: customWorld) {
    await this.delete.filterByEmployeeName(deleteData.delete.employeeName);
    logger.info(`Filtered by employee name: ${deleteData.delete.employeeName}`);
});

When("User clicks the delete icon of the filtered record", async function (this: customWorld) {
    await this.delete.clickDeleteIcon();
    logger.info("Clicked delete icon");
});

Then("Training record should be deleted successfully", async function (this: customWorld) {
    await expect(this.page.getByText(deleteData.delete.employeeName)).not.toBeVisible();
    logger.info("Deleted successfully");
});