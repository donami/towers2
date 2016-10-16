const BASE_URL = 'http://localhost:3001/';

describe('Protractor Test', function() {

  describe('Login', () => {
    it('should redirect to login page', () => {
      browser.get(BASE_URL);
      expect(browser.getCurrentUrl()).toBe(BASE_URL + 'login');
    });

    it('should should not redirect if incorrect api key is used', () => {
      browser.get(BASE_URL + 'login');
      var inputField = element(by.model('vm.userApiKey'));
      var loginButton = element(by.tagName('button'));
      inputField.sendKeys('incorrect api key');
      loginButton.click();

      expect(browser.getCurrentUrl()).toBe(BASE_URL + 'login');
    });

    it('should redirect to main page, given user enters correct api key', () => {
      browser.get(BASE_URL + 'login');
      var inputField = element(by.model('vm.userApiKey'));
      var loginButton = element(by.tagName('button'));
      var key = '9zEUDsWNqr0jCQ0MbIad8QgWH0giPxF4'
      inputField.sendKeys(key);
      loginButton.click();

      expect(browser.getCurrentUrl()).toBe(BASE_URL);
    });

    it('should redirect to main page, given user enters correct api key', () => {
      browser.driver.manage().deleteAllCookies().then(() => {
        browser.get(BASE_URL + 'login');
        var inputField = element(by.model('vm.userApiKey'));
        var loginButton = element(by.tagName('button'));
        var key = '9zEUDsWNqr0jCQ0MbIad8QgWH0giPxF4'
        inputField.sendKeys(key);
        loginButton.click();

        var apiKeyContainer = element(by.css('.alert'));
        expect(apiKeyContainer.getInnerHtml()).toContain(key);
      })
    });

  });

  describe('Me', () => {
    it('should redirect to calendar when clicking button', () => {
      browser.get(BASE_URL);
      var calendarButton = element(by.partialLinkText('Calendar'));
      calendarButton.click();
      expect(browser.getCurrentUrl()).toBe(BASE_URL + 'me/calendar');
    });

    it('should redirect to graphs when clicking button', () => {
      browser.get(BASE_URL);
      var graphsButton = element(by.partialLinkText('My graphs'));
      graphsButton.click();
      expect(browser.getCurrentUrl()).toBe(BASE_URL + 'me/graphs');
    });
  });

});
