import {Page} from "@playwright/test";
import {HelperBase} from "./helperBase";

export class FormLayoutsPage extends HelperBase{

  constructor(page: Page ) {
    super(page);
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
    const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"});
    await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email);
    await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password);
    await usingTheGridForm.getByRole('radio', {name: optionText}).click({force: true});
    await usingTheGridForm.getByRole('button', {name: "Sign in"}).click();
  }

  /**
   * This method fills out the inline form with user details,
   * @param name - should be first and last name
   * @param email - should be a valid email address
   * @param rememberMe - boolean to check or uncheck the "Remember me" checkbox
   */
  async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
    const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"});
    await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(email);
   // await inlineForm.locator("input[placeholder='Jane Doe']").fill(name);
    await inlineForm.getByRole('textbox', {name: "Email"}).fill(email);
    if (rememberMe) {
      await inlineForm.getByRole('button').click();
    }
  }

}
