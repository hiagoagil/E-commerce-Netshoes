const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.netshoes.com.br/',
    proxy: 'https://apm.netshoes.com.br' // Add the proxy configuration here
  },
  viewportWidth: 1440,
  viewportHeight: 900,
  chromeWebSecurity: false
});
