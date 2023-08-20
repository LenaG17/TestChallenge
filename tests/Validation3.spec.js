// ### Validation 3:
//   - Log in as a `standard user`
//   - Sort products by price
//   - Validate that the sorting is right

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
//Json->string->js object
const userCredentials = JSON.parse(
  JSON.stringify(require('../utils/UserCredentials.json'))
);

function isSortedByPrice(prices) {
  for (let i = 1; i < prices.length; i++) {
    const currentPrice = parseFloat(prices[i].replace('$', ''));
    const previousPrice = parseFloat(prices[i - 1].replace('$', ''));
    if (currentPrice < previousPrice) {
      return false;
    }
  }
  return true;
}

//Login as a standart user
test('Login as a Standart user and filter items by price', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  loginPage.validLogin(
    userCredentials.StandartUser.username,
    userCredentials.StandartUser.password
  );

  //Get title - assertion
  await expect(page).toHaveTitle('Swag Labs');
  console.log(await page.title());

  // Click the "Price (low to high)" button to sort products by price
  await page.click('.product_sort_container');
  await page.selectOption('.product_sort_container', 'lohi');

  // Wait for the products to be sorted
  await page.waitForTimeout(1000);

  // Get the list of product names after sorting. $$eval function in Playwright
  // evaluates a function on all elements that match a certain CSS selector and return the results as an array.
  const sortedProductPrices = await page.$$eval(
    '.inventory_item_price',
    (elements) => elements.map((el) => el.textContent)
  );

  // Output data to console
  console.log(JSON.parse(JSON.stringify(sortedProductPrices)));

  // Check if the products are sorted correctly by price
  const sortedCorrectly = isSortedByPrice(sortedProductPrices);

  if (sortedCorrectly) {
    console.log(
      'Validation successful: Products are sorted correctly by price.'
    );
  } else {
    console.log(
      'Validation failed: Products are not sorted correctly by price.'
    );
  }
});
