import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import AddPeoplePage from "../../support/pages/addPeoplePage";
import AddPersonPage from "../../support/pages/addPersonPage";
import DeletePeoplePage from "../../support/pages/deletePeoplePage";
import CommonPage from "../../support/pages/common";

const addPeoplePage = new AddPeoplePage();
const addPersonPage = new AddPersonPage();
const commonPage = new CommonPage();
const deletePeoplePage = new DeletePeoplePage();

//* ****************************************
// * Description  : This step is used to navigate to the add people page.
// * Input        : I navigate to the add people page, click on the add person button.
// * Output       : I successfully navigated to the add people page.
// ****************************************
When("I navigate to the add people page", () => {
  addPeoplePage.verifyPeopleTitle();
  commonPage.clickOnPeopleTab();
  addPeoplePage.clickAddPeopleButton();
  addPeoplePage.clickAddPersonButton();
});

//* ****************************************
// * Description  : This step is used to add a new person.
// * Input        : I enter a random id and email in the Add New Person form.
// * Output       : I successfully added a new person.
// ****************************************
Then("I type id and email in the Add New Person form", () => {
  commonPage.enterRandomID();
  commonPage.enterRandomEmail();
  addPersonPage.verifyUnsavedChangesMessage();
  addPersonPage.clickOnSaveChangesButton();
});

//* ****************************************
// * Description  : This step is used to verify the new person was added.
// * Input        : I verify the new person was added by checking the email.
// * Output       : I successfully verified the new person was added.
// ****************************************
Then("I verify the new person was added", () => {
  addPersonPage.verifyNewEmailWasCreated();
});

//* ****************************************
// * Description  : This step is used to navigate to the edit attributes screen.
// * Input        : I clicked on the attributes tab and clicked on the edit attributes button.
// * Output       : I navigated to the edit attributes screen.
// ****************************************
When("I navigate to the edit attributes screen", () => {
  commonPage.clickAttributesTab();
  commonPage.clickEditAttributesButton();
});

//* ****************************************
// * Description  : This step is used to make changes to the first person in the list.
// * Input        : I clicked on the people tab, entered a search term, selected a search result, clicked on the manage button, and entered a random id.
// * Output       : I made changes to the first person in the list.
// ****************************************
When("I perform changes to the first person in the list", () => {
  commonPage.clickOnPeopleTab();
  commonPage.enterSearchInput();
  commonPage.clickSearchButton();
  commonPage.selectSearchResult();
  commonPage.clickManageButton();
  commonPage.enterRandomID();
});

//* ****************************************
// * Description  : This step is used to verify that the changes were saved.
// * Input        : I clicked on the save changes button and verified that the changes were saved.
// * Output       : I verified that the changes were saved.
// ****************************************
When("I verify that the changes were saved", () => {
  addPersonPage.clickOnSaveChangesButton();
  commonPage.verifyEditedValue();
});

//* ****************************************
// * Description  : This step is used delete the first person in the list.
// * Input        : Navigate to the people tab, enter the search input, click on the search button, select the first person in the list, click on the options dropdown, click on the delete forever button, click on the off button, verify the warning message, type the amount of people, click on the delete and suppress button.
// * Output       : The person is deleted.
// ****************************************
When("I delete the first person in the list", () => {
  commonPage.clickOnPeopleTab();
  commonPage.enterSearchInput();
  commonPage.clickSearchButton();
  commonPage.selectSearchResult();
  deletePeoplePage.clickOptionsDropdown();
  deletePeoplePage.clickDeleteForeverButton();
  deletePeoplePage.clickOffOnButton();
  deletePeoplePage.verifyWarningMessage();
  deletePeoplePage.typeAmountOfPeople();
  deletePeoplePage.clickDeleteAndSuppressButton();
});

//* ****************************************
// * Description  : This step is used to verify that the person was deleted.
// * Input        : Navigate to the people tab, enter the search input, click on the search button, verify the no people found message.
// * Output       : I verify that the person was deleted.
// ****************************************
Then("I verify that the person was deleted", () => {
  commonPage.clickOnPeopleTab();
  commonPage.enterSearchInput();
  commonPage.clickSearchButton();
  deletePeoplePage.verifyNoPeopleFoundMessage();
});
