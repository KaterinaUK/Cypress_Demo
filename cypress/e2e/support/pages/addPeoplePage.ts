import "cypress-file-upload";

export default class AddPeoplePage {
  elements = {
    peopleTitle: () => cy.findByText(/People/i),
    headerPeopleTitle: () => cy.findByTitle(/People/i),
    textAudience: () => cy.findByText(/Build your audience/i),
    addPeopleButton: () => cy.findByRole("button", { name: /Add People/i }),
    addPersonButton: () => cy.findByText(/Add a Person/i),
    importCSVButton: () => cy.findByText(/Import a CSV/i),
  };

  verifyPeopleTitle() {
    this.elements.headerPeopleTitle().should("be.visible");
  }

  verifyAudienceText() {
    this.elements
      .textAudience()
      .should("be.visible")
      .and("have.text", "Build your audience");
  }

  clickAddPeopleButton(force: boolean = true) {
    this.elements.addPeopleButton().scrollIntoView().click({ force });
  }

  clickAddPersonButton() {
    this.elements.addPersonButton().click();
  }

  clickImportCSVButton() {
    this.elements.importCSVButton().click();
  }

  uploadCsvFile() {
    cy.fixture("data_file.csv").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName: "data_file.csv",
        mimeType: "text/csv",
      });
    });
  }
}
