const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.netshoes.com.br/',
  },
  viewportWidth: 1440,
  viewportHeight: 900,
  chromeWebSecurity: false
});
