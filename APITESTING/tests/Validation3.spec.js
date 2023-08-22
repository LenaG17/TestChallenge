// ### Validation 3:
//   - Update a user
//   - Validate that the response code is `200`
//   - Validate that the response body matches the request body where applicable. Do a recursive comparison if possible.

const { test, expect } = require('@playwright/test');

// Recursive function to compare two objects
function recursiveCompare(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!recursiveCompare(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

test('Update User and Validate Response', async () => {
  // API Automation - Task 1: Update a user
  const userId = 201; // Specify the user ID to update
  const updatedAt = new Date();
  const response = await fetch(`https://reqres.in/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'delveyanna@gmail.com',
      first_name: 'Anna',
      last_name: 'Delvey',
      updatedAt, // Use the dynamically generated updatedAt value
    }),
  });

  // API Automation - Task 2: Validate the response code
  const responseCode = response.status;
  expect(responseCode).toBe(200);

  // API Automation - Task 3: Validate response body
  const updatedUser = await response.json();
  console.log('API Response for updatedUser:', updatedUser);
  // Define the expected updated user details
  const expectedUpdatedUser = {
    email: 'delveyanna@gmail.com',
    first_name: 'Anna',
    last_name: 'Delvey',
    // id: userId, // The user ID should match
    updatedAt: updatedAt,
  };
  console.log('API Response for expectedUpdatedUser:', expectedUpdatedUser);

  // Compare response body with expected updated user using a recursive function
  expect(recursiveCompare(updatedUser, expectedUpdatedUser)).toBe(true);
});
