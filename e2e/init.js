/* eslint-disable no-undef */
import { device } from 'detox';

jest.setTimeout(120000);
beforeAll(async () => {
  await device.launchApp({
    newInstance: true,
  });
});
