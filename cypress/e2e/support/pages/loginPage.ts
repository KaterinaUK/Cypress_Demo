import { longTimeout } from "../helpers";

export default class LoginPage {
  elements = {
    welcomeTitle: () => cy.findByText(/Welcome back! Log in to Customer.io/i),
    emailField: () => cy.findByPlaceholderText(/you@company.com/i),
    loginButton: () =>
      cy.findByRole("button", { name: /Log in to Customer.io/i }),
    passwordField: () =>
      cy.get('input[name="password"].fly-form-control[type="password"]'), //implemented this way in the future we can create a data-testid
    dashboardHeader: () => cy.findByText(/Your Setup List/i),
    textAudience: () => cy.findByText(/Build your audience/i),
  };

  verifyWelcomeTitle() {
    this.elements.welcomeTitle().should("be.visible");
  }

  typeMyEmail() {
    cy.clearCookies();
    this.elements
      .emailField()
      .should("be.empty")
      .should("be.visible")
      .click()
      .type(Cypress.env("EMAIL_ADDRESS"));
  }

  typeMyPassword() {
    this.elements
      .passwordField()
      .should("be.empty")
      .should("be.visible")
      .type(Cypress.env("PASSWORD"));
  }

  typeEmail(email: string) {
    cy.clearCookies();
    this.elements
      .emailField()
      .should("be.empty")
      .should("be.visible")
      .click()
      .type(email);
    return email;
  }

  clickLoginButton() {
    this.elements.loginButton().should("be.visible").click();
  }

  typePassword(password: string, timeout = longTimeout) {
    this.elements
      .passwordField()
      .should("be.empty")
      .should("be.visible", { timeout })
      .type(password);
    return password;
  }

  verifyDashboardHeader() {
    this.elements
      .dashboardHeader()
      .should("be.visible")
      .and("have.text", "Your Setup List");
  }
}
