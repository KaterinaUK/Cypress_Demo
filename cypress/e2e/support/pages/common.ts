export default class CommonPage {
  elements = {
    realTimeTitle: () => cy.findByText(/Real-time/i),
    javaScriptTitle: () => cy.findByText(/JavaScript Snippet/i),
    segmentRealTimeTitle: () => cy.findByText(/Segment.com/i),
    oneTimeTitle: () => cy.findByText(/One-time/i),
    headerPeopleTitle: () => cy.findByTitle(/People/i),
    attributesTab: () =>
      cy.get("li.fly-nav-strip__item").contains("Attributes"),
    editAttributesButton: () => cy.get("button").contains("Edit Attributes"),
    searchInput: () => cy.findByPlaceholderText(/Find by email address…/i),
    searchButton: () => cy.get("button").contains("Search"),
    searchResult: () => cy.get("div.text-truncate").contains("@test.com"),
    manageButton: () => cy.findByText(/Manage/i),
    changedIdField: () =>
      cy.get(
        ":nth-child(3) > .flex-1 > .item-value > .cio-attribute-collection__value"
      ),
  };

  clickOnPeopleTab() {
    this.elements.headerPeopleTitle().click();
  }

  enterRandomID() {
    const randomID = Math.floor(Math.random() * 1000000);
    cy.get("#attribute-value-id").clear().type(randomID.toString());
    cy.writeFile("cypress/fixtures/randomvalues.json", { randomID: randomID });
  }

  enterRandomEmail() {
    const randomPart =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const randomEmail = `${randomPart}@test.com`;
    cy.get("#attribute-value-email").type(randomEmail);
    // store the random email in a json file that it could be used on the next stage
    cy.writeFile("cypress/fixtures/randomvalues.json", {
      randomEmail: randomEmail,
    });
  }

  verifyRealTimeTitle() {
    this.elements
      .realTimeTitle()
      .should("be.visible")
      .and("have.text", "Real-time");
  }

  verifyJavaScriptTimeTitle() {
    this.elements
      .javaScriptTitle()
      .should("be.visible")
      .and("have.text", "JavaScript Snippet");
  }

  verifySegmentRealTimeTitle() {
    this.elements
      .segmentRealTimeTitle()
      .should("be.visible")
      .and("have.text", "Segment.com");
  }

  clickAttributesTab() {
    this.elements.attributesTab().click();
  }

  clickEditAttributesButton() {
    this.elements.editAttributesButton().click();
  }

  enterSearchInput() {
    this.elements.searchInput();
    cy.readFile("cypress/fixtures/randomvalues.json").then((data) => {
      this.elements.searchInput().type(data.randomEmail);
    });
  }
  clickSearchButton() {
    this.elements.searchButton().click();
  }

  verifyEditedValue() {
    cy.readFile("cypress/fixtures/randomvalues.json").then((data) => {
      this.elements.changedIdField().should("contain", data.randomID);
    });
  }

  selectSearchResult() {
    this.elements.searchResult().click();
  }

  clickManageButton() {
    this.elements.manageButton().click();
  }
}
