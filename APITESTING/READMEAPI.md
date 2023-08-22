Challenge # API Automation
******\*\*******\*\*\*******\*\*******Description********\*\*********\*\*\*********\*\*********

## Tasks

### Validation 1:

- Get a list of users
- Validate that the response code is `200`
- Print all users with odd ID numbers

### Validation 2:

- Create a new user
- Validate that the response code is `201`
- Validate that the creation date is today

### Validation 3:

- Update a user
- Validate that the response code is `200`
- Validate that the response body matches the request body where applicable. Do a recursive comparison if possible.

### Validation 4:

- Write a parameterized validation with the values `0` and `3`
- Get a list of users passing a delay query parameter with the provided value for the validation
- Validate that the response time is no longer than `1` second

### Validation 5:

- Use whatever asynchronous technique you prefer to get `10` single users
- Validate, asynchronously as well, that all response codes are `200s`

Pay attention that Validation#4 wasn't done becaise of unclear description

******\*\*******\*\*******\*\*******How to Set It Up**********\*\***********\*\***********\*\***********
Clone this repository to your local machine.

Navigate to the directory of the challenge (APITESTING).

Install dependencies using the command: npm install

******\*\*******\*\*\*******\*\*******How to Execute It**********\*\***********\***********\*\***********
Navigate to the directory of the challenge (APITESTING).

Open the VS terminal and navigate to a folder with tests.

Run the test script using the command: npx playwright test
