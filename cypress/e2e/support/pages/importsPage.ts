export default class ImportsPage {
  elements = {
    uploadedFileName: () => cy.findByText(/data_file.csv/i),
    profileIdentifierSection: () => cy.get("#profile-identifier"),
    nextButton: () => cy.findByRole("button", { name: /Next/i }),
    mapFieldsHeader: () => cy.get(".fly-card__section-title"),
    successMessage: () => cy.findByText(/Success!/i),
    completeImportButton: () =>
      cy.findByRole("button", { name: /Complete import/i }),
  };
  verifyUploadedFile() {
    this.elements.uploadedFileName().should("be.visible");
  }

  verifyProfileIdentifierSection() {
    this.elements
      .profileIdentifierSection()
      .scrollIntoView()
      .should("have.text", "How do you want to identify people?");
  }

  clickNextButton(force: boolean = true) {
    this.elements.nextButton().should("be.enabled").click({ force });
  }

  verifyMapFieldsHeader() {
    this.elements.mapFieldsHeader().should("contain.text", "Map fields");
  }

  verifySuccessMessage() {
    this.elements.successMessage().should("be.ok").should("be.visible");
  }

  clickCompleteImportButton() {
    this.elements.completeImportButton().should("be.enabled").click();
    this.elements.completeImportButton().should("not.exist");
  }
}
