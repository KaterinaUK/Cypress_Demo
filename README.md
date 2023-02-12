# Cypress / TypeScript / BDD / Data Driven Testing / POM / Reusability :rocket: :recycle:

## Project Description :writing_hand:

End-to-end tests for the following scenarios are included in this project:

Login: By entering legitimate login information at https://fly.customer.io/login, the test verifies the login capability. After successful logging, the landing page is verified.

People: There are three scenarios available in the feature file: adding a new person, changing part of the selected person's details, and removing the person from the list. Each test is written separately from the others.

Segments: In the feature file, there are three scenarios for creating new segments, editing the selected segment's details, and deleting the segment from the list. Each test is written independently from each other.

## The project uses the following best practices and tools for automated testing:

- Cypress as the test automation framework.
- TypeScript as the programming language.
- Each test is conducted independently of the others and using brand-new data.
- Applying tags to link particular actions to particular tests
- Cypress Testing Library for writing tests in a concise and maintainable manner.
- Page Object Model for organizing the tests into maintainable components.
- Behavior Driven Development (BDD) / Cucumber Style Syntax using cypress-cucumber-preprocessor for writing tests in a human-readable format.
- Reusable functions and test steps to make tests easy to maintain and scalable.
- Data Driven Testing to reduce repetitive code.

## Installation :safety_vest:

### Prerequisites

FOLLOW THESE INSTRUCTIONS CAREFULLY:

1.  The following repo cloned: https://github.com/KaterinaUK/Customer.io-Cypress
2.  Following this README file
3.  In order to allow full Gherkin support, and allow Ctrl+Click or CMD+Click on a step and go to the corresponding code:

- Go to `.vscode/settings.json` file
- Ensure that below code is present on the file. This is already part of the repo.

{ "cucumberautocomplete.steps": [
"cypress/e2e/integration/**/*.ts",
"cypress/e2e/support/*.ts",
],
"cucumberautocomplete.syncfeatures": "cypress/e2e/integration/\*_/_.feature",
"cucumberautocomplete.strictGherkinCompletion": false,
"cucumberautocomplete.smartSnippets": true,
"cucumberautocomplete.stepsInvariants": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,  
} 

4. cypress.env.json - here change the values to reflect your own user email and password, save the file. Then BE SURE to add cypress.env.json into your .gitignore !

### ...then

- Open terminal and run

  `npm install`

### ...drum roll :drum:, finally...

To start the tests, run the following command:

if you want to see the browser - `npm run cypress:open`

to run in headless mode - `npm run cypress:run`

Click on the feature file to run the test.

## Future enhancements :white_check_mark:

- CI/CD integration using Github Actions.
- E2E code coverage
- Create data via API, firebase or similar
- Slack reporting
- Integration with Cypress dashboard
- Consider use of docker for test infra in CI
- Configure parallel runs (maybe Cy Cloud or Cypress-Split)

## Objectives :open_book:

#### 1. Tests written from User-centric view point. The more your tests resemble the way your software is used, the more confidence they can give you.

- [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro) - helps you test UI components in a user-centric way, see the core `dom-testing-library` for much more detail. You write tests that mimic the way that the user would use your software.

> "You should test your software in the way your users are using it" Kent C. Dodds

#### 2. Maintainable tests that give us high confidence that our web app is working for our users.

- using [Page Object Model](https://medium.com/nerd-for-tech/cypress-page-object-model-953791736972) - a design pattern which externalises web elements/locators, reducing code duplication and improving test case maintenace.
- avoid all e2e Cypress [bad practices](https://docs.cypress.io/guides/references/best-practices)

#### 3. Reusabability of tests/code. Tests are written with multiple layers, BDD enabling all to understand the purpose/actions of any test/step. This also aids reusability of common test steps.

- using BDD to enable understanding of tests, and easy reusability of test steps, for detail see: [cucumber/gherkin-syntaxed specs](https://www.npmjs.com/package/cypress-cucumber-preprocessor)
- use of [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands#Syntax) typical logic is easily repeatable e.g. a login command

#### 4. Data-Driven Approach

data-driven approach was used to improve efficiency

#### 5. CI Intergation

CI Intergation - GitHub Actions, repeatable test suite at present runs on schedule, automatically or ondemand e.g. by a developers merge.

## Skipping tests :heavy_minus_sign:

In the event that a test is broken, due to bug found and raised on the incidents channel, the test may temporarily be skipped, so as not to continue to display the failure/s:

add: @skip

## Run scenarios independently :repeat_one:

Select a specific Scenario in the feature file, then place @focus above the scenario.
