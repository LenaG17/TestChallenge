class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.locator('#login-button');
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
  }

  async goTo() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async goToProject() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async validLogin(username, password) {
    await this.username.waitFor();
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
  }
}

module.exports = { LoginPage };
