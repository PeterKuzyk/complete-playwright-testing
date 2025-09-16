import {test, expect} from '@playwright/test';


test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard');
  await page.getByText('Forms').click();
  await page.getByText("Form layout").click();
})

test('Locator syntax rules', async ({page}) => {



});





