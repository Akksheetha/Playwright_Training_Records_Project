Feature: JeevaPranesh_15-07-2026_Add trainee Record functionality

Feature Description
        Background:
            Given the user is launch the application

        Scenario: Add new trainee record
             When the user click the + icon to create a new trainee record
              And the user select project name
              And the user enter the employee ID
              And the user enter the employee name
              And the user enter the course name
              And the user enter the trainer name
              And the user select trainning type
              And the user fill the start date and end date
              And the user select the status
              And the user enter the complete %
             Then the user should see the trainee record in the tranning summary
             