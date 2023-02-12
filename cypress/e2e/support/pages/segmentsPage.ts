import "cypress-file-upload";
import { veryLongTimeout } from "../helpers";

export default class SegmentsPage {
  elements = {
    segmentsTab: () => cy.get("#segments-nav-link").contains("Segments"),
    segmentTitle: () => cy.get("h1").contains("Segments"),
    createSegmentButton: () => cy.findByText(/Create Segment/i),
    nameField: () => cy.get("input.fly-form-control"),
    sampleTagOption: () =>
      cy.get(".ember-power-select-option").contains("Sample"),
    descriptionField: () => cy.get("#description"),
    tagsDropdown: () => cy.findByPlaceholderText(/Choose or create a tag/i),
    manageButton: () => cy.findByText(/Manage/i),
    createNewButton: () => cy.findByText(/Create New/i),
    inputField: () => cy.get("#editForm"),
    doneButton: () => cy.findByText(/Done/i),
    randomTagOption: () => cy.get(".ember-power-select-option"),
    createDataDrivenSegmentButton: () =>
      cy.findByText(/Create Data-driven Segment/i),
    createManualSegmentButton: () => cy.findByText(/Create Manual Segment/i),
    conditionsDropdown: () => cy.get(".js-condition-editor-type-select"),
    specificAttributeBox: () => cy.findByText(/profile attribute/i),
    languageAttribute: () =>
      cy
        .get(
          '[data-option-index="4"] > .fly-power-select__option-label > .fly-power-select__option-label--primary'
        )
        .contains("language"),
    valueField: () => cy.findByPlaceholderText(/value/i),
    saveChangesButton: () => cy.findByRole("button", { name: /Save Changes/i }),
    peopleFoundResult: () => cy.get("a.ember-view.link-primary.no-underline"),
    searchSegmentField: () => cy.findByPlaceholderText(/Find a segment…/i),
    firstSearchResult: () =>
      cy.get("a.link-primary--subtle.no-underline.break-words").first(),
    editSegmentNameButton: () =>
      cy.get(".fly-page-header__title.text-truncate"),
    newSegmentsName: () => cy.findByPlaceholderText(/Segment name…/i),
    editConditionsButton: () => cy.findByText(/Edit Conditions/i),
    saveConditionsButton: () =>
      cy.findByRole("button", { name: /Save Conditions/i }),
    optionsDropdown: () => cy.findByText(/Options/i),
    deleteSegmentButton: () => cy.findByText(/Delete Segment/i),
    headsUpMessage: () =>
      cy.findByText(/Heads up! You're about to delete the segment/i),
    findByTagsDropdown: () => cy.findByPlaceholderText(/Filter by tags…/i),
    selectSampleTag: () =>
      cy.get(".fly-power-select__option-label").contains("Sample"),
    yesButton: () => cy.findByRole("button", { name: /Yes, delete segment/i }),
    noSegmentsFound: () => cy.contains(/No segments found/i),
  };

  clickSegmentsTab(timeout = veryLongTimeout, force: boolean = true) {
    this.elements.segmentsTab().should("be.visible", { timeout });
    this.elements.segmentsTab().click({ timeout, force });
  }

  verifySegmentTitle() {
    this.elements.segmentTitle().should("be.visible");
  }

  clickCreateSegmentButton(force: boolean = true) {
    this.elements.createSegmentButton().click({ force });
  }

  enterSegmentName(name: string) {
    this.elements.nameField().should("be.enabled").clear();
    this.elements.nameField().type(name);
    return name;
  }

  typeRandomSegmentName() {
    // create and type random segment name, save as alias for later use
    const randomSegmentNameString = `segment_${Math.random().toString(36)}`;
    cy.wrap(randomSegmentNameString).as("randomSegmentName");
    this.elements.nameField().should("be.enabled").clear();
    this.elements.nameField().type(randomSegmentNameString);
  }

  enterSegmentDescription(description: string) {
    this.elements.descriptionField().should("be.enabled").type(description);
    return description;
  }

  clickTagsDropdown() {
    this.elements.tagsDropdown().click();
  }

  createRandomNewTag() {
    this.elements.manageButton().click();
    this.elements.createNewButton().click();
    this.elements.inputField();
    // create a random tag name, and save as alias for later use
    const tagName = `tag_${Math.random().toString(36)}`;
    this.elements.inputField().type(tagName);
    cy.wrap(tagName).as("tagName");
    this.elements.saveChangesButton().click();
    this.elements.doneButton().click();
  }

  selectRandomTag() {
    this.elements.findByTagsDropdown().click();
    cy.get("@tagName").then((tagName: any) => {
      this.elements.findByTagsDropdown().type(tagName);
    });
  }

  selectTag(force: boolean = true) {
    this.elements.sampleTagOption().click({ force });
  }

  clickCreateDataDrivenSegmentButton() {
    this.elements.createDataDrivenSegmentButton().click();
  }

  selectLanguageAttribute() {
    this.elements.specificAttributeBox().click();
    this.elements.languageAttribute().click();
  }

  enterValue(language: string) {
    this.elements.valueField().type(language);
    return language;
  }

  clickSaveChangesButton() {
    this.elements.saveChangesButton().click();
  }

  verifyPeopleFoundResult(people: string) {
    this.elements.peopleFoundResult().should("be.visible");
    this.elements.peopleFoundResult().should("contain", people);
  }

  searchSegment(segmentName: string, timeout = veryLongTimeout) {
    this.elements
      .searchSegmentField()
      .should("be.enabled", { timeout })
      .should("be.visible", { timeout })
      .clear()
      .type(segmentName);
  }

  selectFirstSearchResult() {
    this.elements.firstSearchResult().click();
  }

  editSegmentName() {
    this.elements.editSegmentNameButton().click();
    this.elements.newSegmentsName().clear().type("edited_name").click();
  }

  clickEditConditionsButton() {
    this.elements.editConditionsButton().click();
  }

  changeValue(value: string) {
    this.elements.valueField().clear().type(value);
  }

  clickSaveConditionsButton() {
    this.elements.saveConditionsButton().click();
  }

  clickOptionsAndDeleteSegment(force: boolean = true) {
    this.elements.optionsDropdown().should("be.enabled").click({ force });
    this.elements
      .deleteSegmentButton()
      .should("be.enabled")
      .scrollIntoView()
      .click({ force });
    this.elements.headsUpMessage().should("be.visible");
    this.elements.yesButton().click();
  }

  verifySegmentDeleted(segmentName: string) {
    this.searchSegment(segmentName);
    this.elements.noSegmentsFound().should("be.visible");
  }

  uploadCsvFile(fileName: string) {
    cy.fixture(fileName).then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName,
        mimeType: "text/csv",
      });
    });
  }
}
