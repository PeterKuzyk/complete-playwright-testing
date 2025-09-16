import {test, expect} from "@playwright/test";

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
});

test.describe('Form Layout page', () => {
  test.beforeEach(async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText("Form layout").click();
  });

  test('Input Fields', async ({page}) => {
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"})
      .getByRole('textbox', {name: 'Email'});
    await usingTheGridEmailInput.fill('test@test.com');
    await usingTheGridEmailInput.clear();
    // type text letter by letter
    await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500});

    // generic assertions
    const theGridEmailInputValue = await usingTheGridEmailInput.inputValue();
    expect(theGridEmailInputValue).toEqual('test2@test.com');

    // locator assertions
    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
  });

  test('Radio Buttons', async ({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"});

    await usingTheGridForm.getByLabel('Option 1').check({force: true});
    await usingTheGridForm.getByRole('radio', {name: "Option 2"}).click({force: true});

    const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked();
    expect(radioStatus).toBeTruthy();

    // locator assertions
    await expect(usingTheGridForm.getByRole('radio', {name: "Option 2"})).toBeChecked();

    await usingTheGridForm.getByRole('radio', {name: "Option 2"}).click({force: true});
    expect(radioStatus).toBeTruthy();
    expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy();
  })

  test('Checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText("Toastr").click();

    // if using check() or uncheck() methods, it verifies that the checkbox is checked or unchecked
    // if checkbox is already checked and you try to check it again, it will do nothing
    // unlike click() method that does not verify the state of the checkbox and clicks it always
    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true});
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true});

    expect(await page.getByRole('checkbox', {name: "Hide on click"}).isChecked()).toBeFalsy();

    // check all checkboxes
    const allCheckboxes = page.getByRole('checkbox');
    for(const box of await allCheckboxes.all()) {
      await box.check({force: true});
      expect(await box.isChecked()).toBeTruthy();
    }

    // unCheck all checkboxes
    for(const box of await allCheckboxes.all()) {
      await box.uncheck({force: true});
      expect(await box.isChecked()).toBeFalsy();
    }

  })
});
