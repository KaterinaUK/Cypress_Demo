Feature: Login and verify the landing page
    Scenario Outline: Login to the application
    # TODO - create login via session
        Given I am on the login page typing my email address
        When I enter my correct password
        Then I am logged in to the application