describe('App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('should have welcome screen', async () => {
    await expect(element(by.id('greeting'))).toBeVisible();
  });
  it('should fill the form and submit', async () => {
    await element(by.id('name')).typeText('John Doe');
    await element(by.id('password')).typeText('password123');
    await element(by.id('email')).typeText('john.doe@example.com');
    await element(by.id('email')).tapReturnKey();
    await element(by.id('submit')).tap();
    expect(element(by.text('John Doe'))).toBeVisible();
  });
});
