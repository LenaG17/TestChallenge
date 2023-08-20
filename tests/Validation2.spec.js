// ### Validation 2:
//   - Log in as a `standard user`
//   - Sort products by name
//   - Validate that the sorting is right

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
//Json->string->js object
const userCredentials = JSON.parse(
  JSON.stringify(require('../utils/UserCredentials.json'))
);

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

//Login as a standart user
test('Login as a Standart user and filter items by name', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  loginPage.validLogin(
    userCredentials.StandartUser.username,
    userCredentials.StandartUser.password
  );

  //Get title - assertion
  await expect(page).toHaveTitle('Swag Labs');
  console.log(await page.title());

  // Click the "Name (A to Z)" button to sort products by name
  await page.click('.product_sort_container');
  await page.selectOption('.product_sort_container', 'az');

  // Wait for the products to be sorted
  await page.waitForTimeout(1000);

  // Get the list of product names after sorting. $$eval function in Playwright
  // evaluates a function on all elements that match a certain CSS selector and return the results as an array.

  const sortedProductNames = await page.$$eval(
    '.inventory_item_name',
    (elements) => {
      const productNames = elements.map((el) => el.textContent);
      return productNames;
    }
  );
  // Output data to console
  console.log(JSON.parse(JSON.stringify(sortedProductNames)));

  // Check if the products are sorted correctly
  const sortedCorrectly = isSorted(sortedProductNames);

  if (sortedCorrectly) {
    console.log(
      'Validation successful: Products are sorted correctly by name.'
    );
  } else {
    console.log(
      'Validation failed: Products are not sorted correctly by name.'
    );
  }
});
