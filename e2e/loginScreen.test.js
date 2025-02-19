import { device, by, element, expect, waitFor } from 'detox';
describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should init navigation', async () => {
    // console.log('should init navigation');
    // await expect(element(by.id('home-tab'))).toExist();
    // await element(by.id('profile-tab')).tap();
    await waitFor(element(by.id('login-screen')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should check validation', async () => {
    await waitFor(element(by.id('submit')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('submit')).tap();
    await waitFor(element(by.text('name is a required field')))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.text('name is a required field'))).toBeVisible();
    await expect(element(by.text('Email is not valid'))).toBeVisible();
    await expect(
      element(by.text('password must be at least 6 characters')),
    ).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 5000));
  });

  it('should fill the form and submit', async () => {
    await element(by.id('name')).typeText('John Doe');
    await element(by.id('password')).typeText('password123');
    await element(by.id('email')).typeText('john.doe@example.com');
    await element(by.id('email')).tapReturnKey();
    await element(by.id('submit')).tap();
  });
});
