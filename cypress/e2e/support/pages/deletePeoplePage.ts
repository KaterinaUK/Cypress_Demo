export default class DeletePeoplePage {
  elements = {
    optionsDropdown: () => cy.findByText(/Options/i),
    deleteForeverButton: () => cy.findByText(/Delete forever/i),
    deleteForeverTitle: () => cy.findByText(/This person/i),
    offOnButton: () => cy.findByText(/Off/i),
    warningMessage: () => cy.get(".fly-banner__title.font-bold.mb-0"),
    peopleCountBox: () => cy.get("#people-delete-count"),
    deleteAndSuppressButton: () => cy.findByRole("button", { name: /Delete/i }),
    noPeopleFoundMessage: () =>
      cy.findByText(/No people matching your search/i),
  };

  clickOptionsDropdown(force: boolean = true) {
    this.elements.optionsDropdown().click({ force });
  }

  clickDeleteForeverButton(force: boolean = true) {
    this.elements.deleteForeverButton().click({ force });
  }

  clickOffOnButton() {
    this.elements.offOnButton().should("be.visible").click();
  }

  verifyWarningMessage() {
    this.elements
      .warningMessage()
      .should("be.visible")
      .and("contain", "You won’t be able to add this person again");
  }

  typeAmountOfPeople() {
    this.elements.peopleCountBox().should("be.enabled").type("1");
  }

  clickDeleteAndSuppressButton() {
    this.elements.deleteAndSuppressButton().should("be.visible").click();
  }

  verifyNoPeopleFoundMessage() {
    this.elements
      .noPeopleFoundMessage()
      .should("be.visible")
      .and("have.text", "No people matching your search");
  }
}
