// ### Validation 1:
//   - Log in as a `standard user`
//   - Find an item by name, then add it to the cart
//   - Find a second item by name, and add it to the cart as well
//   - Go to the cart
//   - Find an item by name, then remove it from the cart
//   - Validate in the Checkout Overview that:
//   - It only contains the items that you want to purchase
//   - The Item Total is right
//   - Finish the purchase
//   - Validate that the website confirms the order

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
//Json->string->js object
const userCredentials = JSON.parse(
  JSON.stringify(require('../utils/UserCredentials.json'))
);
//Login as a standart user
test('Login as a Standart user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  loginPage.validLogin(
    userCredentials.StandartUser.username,
    userCredentials.StandartUser.password
  );

  //Get title - assertion
  await expect(page).toHaveTitle('Swag Labs');
  console.log(await page.title());

  //Find items and add them to the cart
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  await page.click('text=Sauce Labs Backpack');
  await page.click('.btn_primary.btn_inventory');
  await page.click('#back-to-products');

  await page.click('text=Sauce Labs Bike Light');
  await page.click('.btn_primary.btn_inventory');

  // Go to the cart
  await page.click('.shopping_cart_link');
  // Remove item from the cart
  await page.locator('#remove-sauce-labs-bike-light').click();

  //Fill in arder data
  await page.locator('#checkout').click();
  await page.locator('#first-name').fill('Name');
  await page.locator('#last-name').fill('Last Name');
  await page.locator('#postal-code').fill('50201');
  await page.locator('#continue').click();

  //Validate Checkout Overview
  const itemTotalText = await page.textContent('.summary_subtotal_label');
  const taxText = await page.textContent('.summary_tax_label');
  const itemTotal = parseFloat(itemTotalText.match(/\d+\.\d+/)[0]);
  const tax = parseFloat(taxText.match(/\d+\.\d+/)[0]);

  // Select all items from the cart and provide validation for each one
  const cartItems = await page.$$('.cart_item');
  for (const cartItem of cartItems) {
    const itemName = await cartItem.textContent('.inventory_item_name');
    const itemQuantity = parseInt(await cartItem.textContent('.cart_quantity'));
    const itemPrice = parseFloat(
      (await cartItem.textContent('.inventory_item_price')).match(/\d+\.\d+/)[0]
    );

    const calculatedItemTotal = itemQuantity * itemPrice;

    if (calculatedItemTotal === itemTotal) {
      console.log(
        `Validation successful: Item Total matches quantity (${itemQuantity}) multiplied by price (${itemPrice}) for item "${itemName}".`
      );
    } else {
      console.log(
        `Validation failed: Item Total does not match quantity multiplied by price for item "${itemName}".`
      );
    }
  }
  //Compare Item Total + Tax with Total Price
  const totalPriceText = await page.textContent('.summary_total_label');
  const totalPrice = parseFloat(totalPriceText.match(/\d+\.\d+/)[0]);

  const calculatedTotal = itemTotal + tax;
  if (calculatedTotal === totalPrice) {
    console.log('Validation successful: Item Total + Tax equals Total Price.');
  } else {
    console.log(
      'Validation failed: Item Total + Tax does not equal Total Price.'
    );
  }

  //  Finish the purchase and validate order confirmation
  await page.click('#finish');

  const orderConfirmation = await page.waitForSelector(
    'text=THANK YOU FOR YOUR ORDER'
  );
  console.log(await orderConfirmation.textContent());

  console.log(await page.title());
});
