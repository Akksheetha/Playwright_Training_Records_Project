@Janani
Feature: Add Training - Employee Training Records

  Background:
    Given the user launch the application

  Scenario: Add training with valid training details
    When user clicks the Add button
    And user enter the training details from the JSON file
    And user click on the ADD button
    And user search the employee ID from the JSON file
    Then the employee ID should match the JSON employee ID

  Scenario: Add training without Trainer Name shows validation alert
    When user clicks the Add button
    And user enter the training details without trainer name from the JSON file
    And user click on the ADD button
    Then the validation alert "Trainer Name is required." should be displayed