export default class AddPersonPage {
  elements = {
    titleAddPerson: () => cy.findByText(/Add a Person/i),
    attributesHeader: () => cy.get("#attributes-header"),
    fieldValueID: () => cy.get("#attribute-value-id"),
    fieldEmail: () => cy.get("#attribute-value-email"),
    unsavedChangesMessage: () => cy.findByText(/You have unsaved changes./i),
    saveChangesButton: () => cy.findByRole("button", { name: /Save Changes/i }),
    recentActivityChanges: () =>
      cy.findByRole("button", { name: /Attribute Change/i }),
    addedEmailHeader: () => cy.get("div.fly-flex__block.break-words"),
  };

  verifyPersonPage() {
    this.elements.titleAddPerson().should("be.visible");
    this.elements.attributesHeader().should("be.visible");
  }

  verifyUnsavedChangesMessage() {
    this.elements.unsavedChangesMessage().should("be.visible");
  }

  clickOnSaveChangesButton() {
    this.elements.saveChangesButton().click();
  }

  verifyNewEmailWasCreated() {
    this.elements.recentActivityChanges().click();
    cy.contains("@test.com").should("be.visible");
    cy.readFile("cypress/fixtures/randomvalues.json").then((data) => {
      this.elements.addedEmailHeader().should("contain", data.randomEmail);
      cy.contains(data.randomEmail).should("have.text", data.randomEmail);
    });
    cy.log("New person was created");
  }
}
