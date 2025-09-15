import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard');
  await page.getByText('Forms').click();
  await page.getByText("Form layout").click();
})

test('Locator syntax rules', async ({page}) => {
  // by tag name
  page.locator('input');

  // by ID
  await page.locator('#inputEmail').click();

  // by class name
  page.locator('.shape-rectangle');

  // by attribute
  page.locator('[placeholder="Email"]');

  // by entire class value (full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

  // by different selectors
  page.locator('input[placeholder="Email"]');

  // by Xpath - (NOT RECOMMENDED)
  page.locator('//*[@id="inputEmail"]');

  // by partial text match
  page.locator(':text("Using")');

  // by exact text match
  page.locator(':text-is("Using the Grid")');
});

test('Using facing locators', async ({page}) => {
  await page.getByRole('textbox', {name: 'Email'}).first().click();
  await page.getByRole('button', {name: "Sign in"}).first().click();
  await page.getByLabel('Email').first().click();
  await page.getByTitle('IoT Dashboard').click();
  await page.getByPlaceholder('Jane Doe').click();
  await page.getByText('Form without labels').click();
  await page.getByTestId('SignInButton').click();
});

test('Using child elements', async ({page}) => {
  await page.locator('nb-card nb-radio:has-text("Option 1")').click();
  // same as above
  await page.locator("nb-card").locator('nb-radio').locator('text="Option 1"').click();
  await page.locator('nb-card').getByRole('button',{name: "Sign in"}).first().click();
  // list preferable
  await page.locator('nb-card').nth(3).getByRole('button').click();
});

test('Using Parent elements', async ({page}) => {
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'}).click();
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click();

  await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click();
  await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "password"}).click();
  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('button', {name: "Sign in"}).click();
  // not recommended using Xpath
  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click();
});

test('Reusing locators', async ({page}) => {
  const basicForm = page.locator('nb-card', {hasText: "Basic form"});
  const emailInput = basicForm.getByRole('textbox', {name: 'Email'});
  const passwordInput = basicForm.getByRole('textbox', {name: 'Password'});
  const signInButton = basicForm.getByRole('button');

  await emailInput.fill("test@test.com");
  await passwordInput.fill("Welcome123");
  await basicForm.locator('nb-checkbox').click();
  await signInButton.click();

  await expect(emailInput).toHaveValue("test@test.com");
});

test('Extractiong values', async ({page}) => {
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
