import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  allowCypressEnv: false,
  e2e: {
    supportFile: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    baseUrl: 'https://todomvc.com/examples/react-redux/dist/#/',
    setupNodeEvents() {
      return;
    },
  },
});
