import { expect } from '@playwright/test';

import { customWorld } from './../world/customWorrld';
import { Given,When,Then } from "@cucumber/cucumber";
import filter from '../testData/filter.json'

Given('the user launch the application', async function (this:customWorld) {
  await this.filter.navigate()
});

When('the user click project Name filter', async function (this:customWorld) {
  await this.filter.clickFilter()
});

When('the user select the project of ABC', async function (this:customWorld) {
    await this.filter.clickprojectName()
});

Then('the user should see the ABC project Name', async function (this:customWorld) {
    let act = await this.filter.textProjectName()
    expect(act).toHaveText(filter.filter.projectName)
});


When('the user click the Training Type filter', async function (this:customWorld) {
    await this.filter.clickTrainingFilter()
});

When('the user select the udemy', async function (this:customWorld) {
  await this.filter.clickTainingType()
});

Then('the user should see the udemy Training Typerecords', async function (this:customWorld) {
   let act = await this.filter.TextTraining()
   await act.waitFor({state:"visible"})
   expect (act).toHaveText(filter.filter.TrainingType)
});