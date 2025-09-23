import {Page} from "@playwright/test";

export class HelperBase {

  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // function just for demonstration purposes
  async waitNumberOfSeconds(timeInSeconds: number) {
   await this.page.waitForTimeout(timeInSeconds * 1000);
  }
}
