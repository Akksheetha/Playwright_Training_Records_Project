@Vithya
Feature: Vithya_20-07-2026_Delete the trainee training record in the site

Description:
    As a user,
    I want to delete a trainee training record.

Background:
    Given user is on the homepage of the site

Scenario: Delete trainee training record successfully

    When User filters the training record by employee name
    And User clicks the delete icon of the filtered record
    Then Training record should be deleted successfully