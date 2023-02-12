import './commands';

// Used to ignore uncaught exceptions until https://doitintl.atlassian.net/browse/CMP-5405 is resolved
Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Missing or insufficient permissions")) {
      // Returning false here prevents Cypress from failing the test
      return false;
    }
  });