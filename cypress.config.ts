import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { defineConfig } from "cypress";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 45000,
    pageLoadTimeout: 80000,
    viewportWidth: 1000,
    viewportHeight: 660,
    chromeWebSecurity: false,
    baseUrl: "https://fly.customer.io/",
    specPattern: "cypress/e2e/**/*.{feature,features}",
    supportFile: "cypress/e2e/support/index.ts",
    setupNodeEvents,
  },
});
