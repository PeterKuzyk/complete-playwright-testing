import {expect, test} from "@playwright/test";

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard');
  await page.getByText('Forms').click();
  await page.getByText("Form layout").click();
})

test('Assertions - General Assertions', async ({page}) => {
  const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');
  // General Assertions
  const buttonText = await basicFormButton.textContent();
  expect(buttonText).toEqual('Submit');
});

test('Assertions - Locator Assertions', async ({page}) => {
  const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');
  // Locator Assertions
  await expect(basicFormButton).toHaveText('Submit');
});

test('Assertions - Soft Assertions', async ({page}) => {
  const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');
  // Soft Assertions
  await expect.soft(basicFormButton).toHaveText('Submit');
  await basicFormButton.click();
});


test('Assertions - general', async ({page}) => {
  // toEqual()
  const basicForm = page.locator('nb-card', {hasText: "Basic form"});
  const buttonText = await basicForm.locator('button').textContent();
  expect(buttonText).toEqual('Submit');

  // toContain()
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents();
  expect(allRadioButtonsLabels).toContain('Option 1');

  // toEqual()
  const emailField = basicForm.getByRole('textbox', {name: 'Email'});
  await emailField.fill("test@test.com");
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual('test@test.com');

  // toEqual()
  const placeholderValue = await emailField.getAttribute('placeholder');
  expect(placeholderValue).toEqual('Email');
});
