import {test, expect} from "@playwright/test";
import {NavigationPage} from "../page-objects/navigationPage";
import {FormLayoutsPage} from "../page-objects/formLayoutsPage";

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
});

test('Navigate to form page', async ({page}) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutPage();
  await navigateTo.datePickerPage();
  await navigateTo.smartTablePage();
  await navigateTo.toastPage();
  await navigateTo.tooltipPage();
})

test('Parameterized methods', async ({page}) => {
  const navigateTo = new NavigationPage(page);
  const formLayoutsPage = new FormLayoutsPage(page);
  await navigateTo.formLayoutPage()
  await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption("test@teste.com", "teste123", "Option 2");
})

test('Parameterized methods with booleans (check box selection)', async ({page}) => {
  const navigateTo = new NavigationPage(page);
  const formLayoutsPage = new FormLayoutsPage(page);
  await navigateTo.formLayoutPage()
  await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox("Jame Doe", "test@test.com", true)
})
