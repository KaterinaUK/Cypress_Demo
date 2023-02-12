Feature: People actions
    Background:
        Given I verified dashboard, navigated to add people, and entered id and email in the form

    @login
    Scenario Outline: Validate that a new person has been successfully created
        Then I verify the new person was added

    @login
    Scenario Outline: Edit the person via search
        When I perform changes to the first person in the list
        Then I verify that the changes were saved

    @login
    Scenario Outline: Delete the person via search
        When I delete the first person in the list
        Then I verify that the person was deleted