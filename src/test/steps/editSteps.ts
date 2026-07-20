import { expect } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";
import { customWorld } from "../world/customWorrld";
import edit from "../testData/edit.json";
import { logger } from "../utilites/logger";

let employeeName: string;
let courseName: string;
let trainerName: string;
Given("user is on the homepage of the site", async function (this: customWorld) {

    await this.edit.navigate();
    logger.info("Launching the website");

});

When("User clicks the edit icon of an existing training record", async function (this: customWorld) {
    await this.edit.clickEditIcon(edit.edit.id);
    logger.info("Clicking edit icon");

});

When("User updates the trainee training details", async function (this: customWorld) {

    employeeName = `${edit.edit.employeeName}${Math.floor(Math.random() * 100)}`;
    await this.edit.editEmployeeName(employeeName);
    courseName = `${edit.edit.projectName}${Math.floor(Math.random() * 100)}`;
    await this.edit.editProjectName(courseName);
    trainerName = `${edit.edit.trainerName}${Math.floor(Math.random() * 100)}`;
    await this.edit.editTrainerName(trainerName);
    logger.info("Edited the details");

});

When("User clicks the Update button", async function (this: customWorld) {

    await this.edit.clickUpdateButton();
    logger.info("Clicked update");

});

Then("Training record should be updated successfully", async function (this: customWorld) {

    await expect(this.page.getByText(employeeName)).toBeVisible();
    logger.info("Edited successfully");

});