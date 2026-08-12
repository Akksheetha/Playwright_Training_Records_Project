import { expect } from "@playwright/test";
import { When, Then } from "@cucumber/cucumber";
import { customWorld } from "../world/customWorrld";

When("the user click on the Export to Excel button", async function (this: customWorld) {
    this.download = await this.homePage.clickDownloadButton()
});

Then("the Excel file should be downloaded successfully", async function (this:customWorld) {
    const failure = await this.download.failure();
    expect(failure).toBeNull();
    const fileName = this.download.suggestedFilename();
    await this.download.saveAs(`downloads/${fileName}`);
    expect(this.homePage.downloadBtn).toBeTruthy();
});