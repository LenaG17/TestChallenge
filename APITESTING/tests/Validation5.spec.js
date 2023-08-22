// ### Validation 5:
//   - Use whatever asynchronous technique you prefer to get `10` single users
//   - Validate, asynchronously as well, that all response codes are `200s`
const { test, expect } = require('@playwright/test');

test('Fetch and Validate 10 Users with GET', async () => {
  console.log('Fetching 10 users with GET method...');

  const fetchPromises = Array.from({ length: 10 }, (_, index) =>
    fetch(`https://reqres.in/api/users/${index + 1}`)
  ); // (_, index) => fetch(`https://reqres.in/api/users/${index + 1}`) This is a function
  //  that will be executed for each element in the new array. The function takes two arguments:
  //  the element itself (which is not used in this case and represented by _) and the index of the element

  // Wait for all fetch promises to complete
  const responses = await Promise.all(fetchPromises);

  // Validate and log response codes
  console.log('Validating response codes...');
  const responseCodes = responses.map((response, index) => {
    console.log(`User ${index + 1} - Response code: ${response.status}`);
    return response.status;
  });
  expect(responseCodes.every((code) => code === 200)).toBe(true);
});
