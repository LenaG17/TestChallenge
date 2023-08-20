// ### Validation 4:
//   - Log in as a `locked_out_user`
//   - The validation should fail
//   - Add capabilities to your program so it can create reports with screenshots when something fails

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
//Json->string->js object
const userCredentials = JSON.parse(
  JSON.stringify(require('../utils/UserCredentials.json'))
);

//Login as a LockedUser
test('Login as a LockedUser and filter items by price', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  loginPage.validLogin(
    userCredentials.LockedUser.username,
    userCredentials.LockedUser.password
  );

  // Wait for error message to appear
  await page.waitForSelector('.error-button');

  // Capture a screenshot when something fails
  await page.screenshot({ path: 'failed_login_screenshot.png' });

  console.log(
    'Validation failed: Login attempt should fail for locked_out_user.'
  );
});
