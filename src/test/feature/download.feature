@Darshan
Feature: Export Excel Data

  Background:
    Given user is on the homepage of the site

  Scenario: Verify Export to Excel functionality 
    When the user click on the Export to Excel button
    Then the Excel file should be downloaded successfully