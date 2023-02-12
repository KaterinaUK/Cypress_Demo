import { When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../support/pages/loginPage";
import CommonPage from "../../support/pages/common";
import AddPeoplePage from "../../support/pages/addPeoplePage";
import AddPersonPage from "../../support/pages/addPersonPage";
import ImportsPage from "../../support/pages/importsPage";
import SegmentsPage from "../../support/pages/segmentsPage";

const loginPage = new LoginPage();
const commonPage = new CommonPage();
const segmentsPage = new SegmentsPage();
const addPeoplePage = new AddPeoplePage();
const addPersonPage = new AddPersonPage();
const importsPage = new ImportsPage();

//* ****************************************
// * Description  : This step is used to verify the dashboard page.
// * Input        : I validate different elements of the landing page.
// * Output       : I verified the dashboard page and clicked on the people tab.
// ****************************************
When("I verify the dashboard page", () => {
  loginPage.verifyDashboardHeader();
  commonPage.verifySegmentRealTimeTitle();
  commonPage.verifyJavaScriptTimeTitle();
  addPeoplePage.verifyPeopleTitle();
});

//* ****************************************
// * Description  : This step is used as a tag to run the login steps before each scenario.
// * Input        : I navigate to the login page and enter the email and password.
// * Output       : I logged in to the application.
// ****************************************
Before({ tags: "@login" }, () => {
  cy.visit("/login");
  loginPage.typeMyEmail();
  loginPage.clickLoginButton();
  loginPage.typeMyPassword();
  loginPage.clickLoginButton();
});

//* ****************************************
// * Description  : This step is used as a tag to run the seed data steps before the scenarios.
// * Input        : I navigate to the import page and upload the csv file.
// * Output       : New data with people is added to the database.
// ****************************************
Before({ tags: "@seedData" }, () => {
  commonPage.clickOnPeopleTab();
  addPeoplePage.clickAddPeopleButton();
  addPeoplePage.clickImportCSVButton();
  addPeoplePage.uploadCsvFile();
  importsPage.verifyUploadedFile();
  importsPage.verifyProfileIdentifierSection();
  importsPage.clickNextButton();
  importsPage.verifyMapFieldsHeader();
  importsPage.clickNextButton();
  importsPage.verifySuccessMessage();
  importsPage.clickCompleteImportButton();
  segmentsPage.clickSegmentsTab();
});

//* ****************************************
// * Description  : This step is used to validate the functionality of the landing page and submit id and email in the form.
// * Input        : I verified dashboard, navigated to add people, and entered id and email in the form.
// * Output       : I successfully added a new person to the database.
// ****************************************
Then(
  "I verified dashboard, navigated to add people, and entered id and email in the form",
  () => {
    loginPage.verifyDashboardHeader();
    commonPage.verifySegmentRealTimeTitle();
    commonPage.verifyJavaScriptTimeTitle();
    addPeoplePage.verifyPeopleTitle();
    commonPage.clickOnPeopleTab();
    addPeoplePage.clickAddPeopleButton();
    addPeoplePage.clickAddPersonButton();
    commonPage.enterRandomID();
    commonPage.enterRandomEmail();
    addPersonPage.verifyUnsavedChangesMessage();
    addPersonPage.clickOnSaveChangesButton();
  }
);
