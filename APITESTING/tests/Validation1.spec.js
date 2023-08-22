// ### Validation 1:
//   - Get a list of users
//   - Validate that the response code is `200`
//   - Print all users with odd ID numbers

const { test, expect } = require('@playwright/test');

test('Validate API and Web Automation Tasks', async ({ page }) => {
  // API Automation - Task 1: Get a list of users

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // Specify the content type
    },
  };
  // Get data from 2 pages: page1 and page2
  const response1 = await fetch(
    'https://reqres.in/api/users?page=1',
    requestOptions
  );

  const response2 = await fetch(
    'https://reqres.in/api/users?page=2',
    requestOptions
  );
  // Data is represented in json format
  const usersData1 = await response1.json();
  console.log('API Response 1:', usersData1);
  const usersData2 = await response2.json();
  console.log('API Response 2:', usersData2);

  // Join page1 data with page2 data and console output json data for all users from both pages
  const combinedUsersData = Object.assign({}, usersData2, usersData1);

  console.log(combinedUsersData);

  // API Automation - Task 2: Validate the response code
  expect(response1.status).toBe(200);
  console.log('API Response code is 200 (OK) for page1');
  expect(response2.status).toBe(200);
  console.log('API Response code is 200 (OK) for page2');

  // Web Automation - Task 3: Print users with odd ID numbers
  console.log('Users with odd ID numbers:');
  combinedUsersData.data.forEach((user) => {
    if (user.id % 2 !== 0) {
      console.log(`ID: ${user.id}, Name: ${user.first_name} ${user.last_name}`);
    }
  });
});
