import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import SegmentsPage from "../../support/pages/segmentsPage";
import LoginPage from "../../support/pages/loginPage";

const segmentsPage = new SegmentsPage();
const loginPage = new LoginPage();

//* ****************************************
// * Description  : This step is used to add a new segment in a data driven way.
// * Input        : I add a new segment, with dynamic values , add the dynamic attribute.
// * Output       : I save the changes and create a new segment.
// ****************************************
Then(
  "I add a new segment, with {string} and {string}, create a new tag and the attribute {string} value",
  (segmentName: string, description: string, language: string) => {
    segmentsPage.clickSegmentsTab();
    segmentsPage.verifySegmentTitle();
    segmentsPage.clickCreateSegmentButton();
    segmentsPage.enterSegmentName(segmentName);
    segmentsPage.enterSegmentDescription(description);
    cy.wrap(segmentName).as("segmentName");
    segmentsPage.clickTagsDropdown();
    segmentsPage.createRandomNewTag();
    segmentsPage.clickCreateDataDrivenSegmentButton();
    segmentsPage.elements.conditionsDropdown().select("Attribute");
    segmentsPage.selectLanguageAttribute();
    segmentsPage.enterValue(language);
    segmentsPage.clickSaveChangesButton();
  }
);

//* ****************************************
// * Description  : This step is used to add a random segment name.
// * Input        : N/A
// * Output       : N/A
// ****************************************
Then(
  "I add a new random segment, and {string}, create a new tag add the attribute {string} value",
  (description: string, language: string) => {
    segmentsPage.clickSegmentsTab();
    segmentsPage.verifySegmentTitle();
    segmentsPage.clickCreateSegmentButton();
    segmentsPage.typeRandomSegmentName();
    segmentsPage.enterSegmentDescription(description);
    segmentsPage.clickTagsDropdown();
    segmentsPage.createRandomNewTag();
    segmentsPage.clickCreateDataDrivenSegmentButton();
    segmentsPage.elements.conditionsDropdown().select("Attribute");
    segmentsPage.selectLanguageAttribute();
    segmentsPage.enterValue(language);
    segmentsPage.clickSaveChangesButton();
  }
);

//* ****************************************
// * Description  : This step is used to confirm that the segment has been successfully added to the segments page.
// * Input        : I input the segment name and verify that the segment.
// * Output       : I validate that the number of people found is correct.
// ****************************************
Then(
  "I confirm that {string} has been successfully added to the segments page, and check that the {string} result count is correct",
  (segmentName: string, people: string) => {
    cy.get("@segmentName").should("equal", segmentName);
    segmentsPage.verifyPeopleFoundResult(people);
  }
);

//* ****************************************
// * Description  : This step is used to find a specific segment and edit the attribute value.
// * Input        : I search for a specific segment and change the attribute value.
// * Output       : I changed the attribute value and saved the changes.
// ****************************************
When(
  "I find specific segment with this {string} then change attribute to {string}",
  (segmentName: string, differentLanguage: string) => {
    cy.reload();
    segmentsPage.clickSegmentsTab();
    segmentsPage.verifySegmentTitle();
    segmentsPage.searchSegment(segmentName);
    segmentsPage.selectFirstSearchResult();
    segmentsPage.editSegmentName();
    segmentsPage.clickEditConditionsButton();
    segmentsPage.changeValue(differentLanguage);
    cy.wrap(differentLanguage).as("differentLanguage");
    segmentsPage.clickSaveConditionsButton();
  }
);

//* ****************************************
// * Description  : This step is used verify the result count and the new attribute value.
// * Input        : differentLanguage is the new attribute value and result is the result count.
// * Output       : Number of people found is correct and the new attribute value is correct.
// ****************************************
Then(
  "I verify that the that the {string} result count is correct and {string} is the new attribute value",
  (result: string, differentLanguage: string) => {
    cy.get("@differentLanguage").should("equal", differentLanguage);
    segmentsPage.verifyPeopleFoundResult(result);
  }
);

//* ****************************************
// * Description  : This step is used to navigate to the segments page and delete the selected segment.
// * Input        : I navigate to the segments page and find the segment and delete it.
// * Output       : I deleted the segment from the list.
// ****************************************
When("I find the new random segment and delete it from the list", () => {
  cy.reload();
  if (segmentsPage.elements.segmentsTab().should("exist")) {
    segmentsPage.clickSegmentsTab();
    cy.get("@randomSegmentName").then((segmentName: any) => {
      segmentsPage.searchSegment(segmentName);
    });
    segmentsPage.selectFirstSearchResult();
    segmentsPage.clickOptionsAndDeleteSegment();
  } else {
    loginPage.typeMyEmail();
    loginPage.clickLoginButton();
    loginPage.typeMyPassword();
    loginPage.clickLoginButton();
    // repeat of above but after we logged in
    segmentsPage.clickSegmentsTab();
    cy.get("@randomSegmentName").then((segmentName: any) => {
      segmentsPage.searchSegment(segmentName);
    });
    segmentsPage.selectFirstSearchResult();
    segmentsPage.clickOptionsAndDeleteSegment();
  }
});

//* ****************************************
// * Description  : This step is used to verify that the segment was deleted.
// * Input        : After deleting the segment, I verify that the segment was deleted.
// * Output       : I verified that the segment was deleted.
// ****************************************
Then("I verify that the random segment was deleted", () => {
  segmentsPage.clickSegmentsTab();
  segmentsPage.selectRandomTag();
  cy.get("@randomSegmentName").then((segmentName: any) => {
    segmentsPage.verifySegmentDeleted(segmentName);
  });
});
