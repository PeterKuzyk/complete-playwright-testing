import {expect, test} from "@playwright/test";

test.beforeEach(async ({page}) => {
  await page.goto('http://uitestingplayground.com/ajax');
  await page.getByText('Button Triggering AJAX Request').click();
})

test('Auto Waiting - Locator Assertions click', async ({page}) => {
  const successButton = page.locator('.bg-success');

  await successButton.click();
});

test('Auto Waiting - Locator Assertions textContent', async ({page}) => {
  const successButton = page.locator('.bg-success');
  const text = await successButton.textContent();

  expect(text).toEqual('Data loaded with AJAX get request.');
});

test('Additional Waiting for method that do not have auto waiting', async ({page}) => {
  const successButton = page.locator('.bg-success');
  // wait for element to be attached to the DOM
  await successButton.waitFor({state: 'attached'});
  const text = await successButton.textContent();

  expect(text).toEqual('Data loaded with AJAX get request.');
});

test('Custom Timeouts', async ({page}) => {
  const successButton = page.locator('.bg-success');

  await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 5000});
});

test('Alternative Waiting', async ({page}) => {
  const successButton = page.locator('.bg-success');

  // __ wait for element
  // await page.waitForSelector('.bg-success');

  //__ wait for particular response
  //await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

  //__ wait for network calls to finish (NOT RECOMMENDED)
  await page.waitForLoadState('networkidle');

  //__ wait for timeout (NOT RECOMMENDED)
  // await page.waitForTimeout(5000);

  const text = await successButton.allTextContents();
  expect(text).toContain('Data loaded with AJAX get request.');
});

test('Test slow', async ({page}) => {
  //__ mark test as slow - increase timeout by 3X
  test.slow();
  const successButton = page.locator('.bg-success');

  await successButton.click()
});

test.only('Test suite timeout', async ({page}, testInfo) => {
  //__ mark test suit - increase timeout
  const successButton = page.locator('.bg-success');
  await successButton.click()
  testInfo.setTimeout(testInfo.timeout() + 2000);
});

