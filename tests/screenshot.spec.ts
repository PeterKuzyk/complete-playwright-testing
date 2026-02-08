import {expect, test} from "@playwright/test";
import {PageManager} from "../page-objects/pageManager";

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
});

test('Ful page screenshot example', async ({page}) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutPage()
  await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption("test@teste.com", "teste123", "Option 2");
  await page.screenshot({path: "./screenshot/screenshot.png"});
})

test('Selected area screenshot example', async ({page}) => {
  const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"});
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutPage()
  await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: "./screenshot/InlineForm.png"});
  await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption("test@teste.com", "teste123", "Option 2");
})

test('Ful page screenshot save it as a Buffer', async ({page}) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutPage()
  await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption("test@teste.com", "teste123", "Option 2");
  await page.screenshot({path: "./screenshot/screenshot.png"});
  const buffer = await page.screenshot();
  console.log(buffer.toString('base64'));
})

