import { expect } from '@playwright/test';

import { customWorld } from './../world/customWorrld';
import { Given,When,Then } from "@cucumber/cucumber";


Given('the user launch the application', async function (this:customWorld) {
  await this.filter.navigate()
});

When('the user click project Name filter', async function (this:customWorld) {
  await this.filter.clickFilter()
});

When('the user select the project of ABC', async function (this:customWorld) {
    await this.filter.clickprojectName()
});

Then('the user should see the {string} project Name', async function (this:customWorld,string) {
    let act = await this.filter.textProjectName()
    expect(act).toHaveText(string)
});