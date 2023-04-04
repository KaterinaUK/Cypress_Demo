import './commands';

Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Missing or insufficient permissions")) {
      // Returning false here prevents Cypress from failing the test
      return false;
    }
  });