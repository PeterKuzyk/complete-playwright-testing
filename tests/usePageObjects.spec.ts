import {test} from "@playwright/test";
import {PageManager} from "../page-objects/pageManager";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/');
});

test('Navigate to form page', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutPage();
    await pm.navigateTo().datePickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastPage();
    await pm.navigateTo().tooltipPage();
})

test('Parameterized methods', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption("test@teste.com", "teste123", "Option 2");
})

test('Parameterized methods with booleans (check box selection)', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox("Jame Doe", "test@test.com", true)
})

test('Parameterized methods - Datepicker test - Common Datepicker', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFomToday(5)
});

test('Parameterized methods - Datepicker test - Datepicker with Range', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6, 15)
});
