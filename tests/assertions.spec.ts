import {expect, test} from "@playwright/test";

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard');
  await page.getByText('Forms').click();
  await page.getByText("Form layout").click();
})

test.only('Extractiong values', async ({page}) => {
  // single test value
  const basicForm = page.locator('nb-card', {hasText: "Basic form"});
  const buttonText = await basicForm.locator('button').textContent();
  expect(buttonText).toEqual('Submit');

  // multiple test values
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents();
  expect(allRadioButtonsLabels).toContain('Option 1');

  // values of input fields
  const emailField = basicForm.getByRole('textbox', {name: 'Email'});
  await emailField.fill("test@test.com");
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual('test@test.com');

  // palace holder value
  const placeholderValue = await emailField.getAttribute('placeholder');
  expect(placeholderValue).toEqual('Email');
});
