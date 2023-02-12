import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../support/pages/loginPage";
import CommonPage from "../../support/pages/common";

const loginPage = new LoginPage();
const commonPage = new CommonPage();

//* ****************************************
// * Description  : This step is used to login to the application with valid credentials.
// * Input        : I navigate to the login page and enter my email.
// * Output       : I see a password submission page.
// ****************************************
Given("I am on the login page typing my email address", () => {
  cy.visit("/login");
  loginPage.typeMyEmail();
  loginPage.clickLoginButton();
});

//* ****************************************
// * Description  : This step is used to login to the application with valid credentials.
// * Input        : I navigate to the password submission page and enter my password.
// * Output       : I see the dashboard page.
// ****************************************
When("I enter my correct password", () => {
  loginPage.typeMyPassword();
  loginPage.clickLoginButton();
});

//* ****************************************
// * Description  : This step is used to verify that the user is logged in to the application.
// * Input        : I see the dashboard page and verify this page.
// * Output       : I am logged in to the application.
// ****************************************
Then("I am logged in to the application", () => {
  loginPage.verifyDashboardHeader();
  commonPage.verifySegmentRealTimeTitle();
  commonPage.verifyJavaScriptTimeTitle();
});
