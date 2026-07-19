Feature:Filter functiomality


Feature Description
        Background:
            Given the user launch the application

        Scenario:Filter records by Project Name
             When the user click project Name filter
              And the user select the project of ABC
             Then the user should see the ABC project Name

        Scenario: Filter records by Training Type
             When the user click the Training Type filter
              And the user select the udemy
             Then the user should see the udemy Training Typerecords


