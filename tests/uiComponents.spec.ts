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
    for (const box of await allCheckboxes.all()) {
      await box.check({force: true});
      expect(await box.isChecked()).toBeTruthy();
    }

    // unCheck all checkboxes
    for (const box of await allCheckboxes.all()) {
      await box.uncheck({force: true});
      expect(await box.isChecked()).toBeFalsy();
    }

  })

  test('Lists', async ({page}) => {
    const dropdownMenu = page.locator('ngx-header nb-select');
    await dropdownMenu.click();

    page.getByRole('list') // when the list has a UL tag
    page.getByRole('listitem') // when the list has a LI tag
    // example
    // const optionList = page.getByRole('list').locator('nb-option');
    const optionList = page.locator('nb-option-list nb-option');

    await expect(optionList).toHaveText([' Light', ' Dark', ' Cosmic', ' Corporate']);

    await optionList.filter({hasText: ' Cosmic'}).click();

    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors = {
      "Light": 'rgb(255, 255, 255)',
      "Dark": 'rgb(34, 43, 69)',
      "Cosmic": 'rgb(50, 50, 89)',
      "Corporate": 'rgb(255, 255, 255)',
    }
    await dropdownMenu.click();
    for (const color in colors) {
      await optionList.filter({hasText: color}).click();
      await expect(header).toHaveCSS('background-color', colors[color]);
      if (color != "Corporate") {
        await dropdownMenu.click();
      }
    }
  });

  test('Tooltips', async ({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText("Tooltip").click();

    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placement"});

    await toolTipCard.getByRole('button', {name: "Top"}).hover();

    page.getByRole('tooltip') // it going to work a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent();
    expect(tooltip).toEqual('This is a tooltip');
  });

  test('Dialog Boxes', async ({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Are you sure you want to delete?');
      dialog.accept();
    });
    // Click the delete icon for a specific row
    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'})
      .locator('.nb-trash').click();

    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
  });

  test('Web Tables 1', async ({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // get the row by any text in the row
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'});
    await targetRow.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('Age').clear();
    await page.locator('input-editor').getByPlaceholder('Age').fill('35');
    await page.locator('.nb-checkmark').click();

    //2 get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    const targetRowById = page.getByRole('row', {name: '11'})
      .filter({has: page.locator('td').nth(1).getByText('11')});
    await targetRowById.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com');
    await page.locator('.nb-checkmark').click();
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com');
  });

  test('Web Tables 2 - Loop', async ({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // 3 filter of the table
    const ages = ["20", "30", "40", "200"];

    for (let age of ages) {
      await page.locator('input-filter').getByPlaceholder('Age').clear();
      await page.locator('input-filter').getByPlaceholder('Age').fill(age);
      await page.waitForTimeout(500); // wait for the table to refresh
      const ageRows = page.locator('tbody tr');

      for (let row of await ageRows.all()) {
        const celValue = await row.locator('td').last().textContent();

        if (age == "200") {
          expect(await page.getByRole('table').textContent()).toContain('No data found');
        } else {
          expect(celValue).toContain(age);
        }
      }
    }
  });

  test('Date Picker - option 1', async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();
    // method 1 - not recommended - because it may fail if the month is different
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('19', {exact: true}).click();
    await expect(calendarInputField).toHaveValue('Sep 19, 2025');

  });

  test('Date Picker - option 2  using Date()', async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();

    // method 2 - recommended
    let date = new Date();
    date.setDate(date.getDate() + 1);
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'});
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'});
    const expectedDate = date.getDate().toString();
    const expectedYear = date.getFullYear().toString();
    let calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

    // example one - concatenation
    const dateToAssert = expectedMonthShort + ' ' + expectedDate + ', ' + expectedYear;
    // example two - template string
    const dateToAssertTwo = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
    // select the month and year in the calendar
    while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {
      await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
      calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click();
    await expect(calendarInputField).toHaveValue(dateToAssertTwo);
  });

  test('Sliders', async ({page}) => {
    await page.getByText('IoT Dashboard').click();

    const tempGage = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    await tempGage.evaluate(node => {
      node.setAttribute('cx', '77.492')
      node.setAttribute('cy', '24.874')
    })
    await tempGage.click(); // have to use .click() to trigger the change event

    // actual mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded()

    // starting point of the circle - center of the circle
    const box = await tempBox.boundingBox();
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y );
    await page.mouse.move(y + 100, y + 100 );
    await page.mouse.up();

    await expect(tempBox).toContainText('29')
  });
})
