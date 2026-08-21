import { Given, When, Then } from "@cucumber/cucumber";
import { customWorld } from "../world/customWorrld";
import addTrainingData from "../testData/add.json";


When("user clicks the Add button", async function (this: customWorld) {
    await this.addpage.plusIcon.click();
});

When("user enter the training details from the JSON file", async function (this: customWorld) {
    await this.addpage.fillAddTrainingForm(addTrainingData.validTraining);
});

When("user enter the training details without trainer name from the JSON file", async function (this: customWorld) {
    await this.addpage.fillAddTrainingForm(addTrainingData.invalidTrainingWithoutTrainer);
});

When("user click on the ADD button", async function (this: customWorld) {
    await this.addpage.clickAddButton();
});

When("user search the employee ID from the JSON file", async function (this: customWorld) {
    await this.addpage.searchEmployeeId(addTrainingData.validTraining.empId);
});

Then("the employee ID should match the JSON employee ID", async function (this: customWorld) {
    await this.addpage.verifyEmployeeId(addTrainingData.validTraining.empId);
});

Then("the validation alert {string} should be displayed", async function (this: customWorld, message: string) {
    await this.addpage.verifyValidationAlert(message);
});