// ### Validation 2:
//   - Create a new user
//   - Validate that the response code is `201`
//   - Validate that the creation date is today

const { test, expect } = require('@playwright/test');

test('Create and Validate New User', async () => {
  // API Automation - Task 1: Create a new user
  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test120986@gmail.com',
      first_name: 'Olena',
      last_name: 'G',
    }),
  });

  // API Automation - Task 2: Validate the response code
  const responseCode = response.status;
  console.log('API Response code:', responseCode);
  expect(responseCode).toBe(201);

  // API Automation - Task 3: Validate creation date is today
  const userData = await response.json();
  console.log('UserData:', userData);
  const creationDate = new Date(userData.createdAt).toDateString();
  const todayDate = new Date().toDateString();
  console.log('Creation Date:', creationDate);
  console.log('Today Date:', todayDate);
  expect(creationDate).toBe(todayDate);
});
