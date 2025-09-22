import {Locator, Page} from '@playwright/test';

export class NavigationPage {

  readonly page: Page
  readonly formLayoutsMenuItem : Locator
  readonly datePickerMenuItem: Locator
  readonly smartTableMenuItem: Locator
  readonly toastMenuItem : Locator
  readonly tooltipMenuItem : Locator

  constructor(page: Page) {
    this.page = page;
    this.formLayoutsMenuItem = page.getByText('Form layout');
    this.datePickerMenuItem = page.getByText('Datepicker');
    this.smartTableMenuItem = page.getByText('Smart Table');
    this.toastMenuItem = page.getByText('Toastr');
    this.tooltipMenuItem = page.getByText('Tooltip');
  }

  async formLayoutPage() {
    await this.selectGroupNameItem('Forms');
    await this.formLayoutsMenuItem.click();
  }

  async datePickerPage() {
    await this.selectGroupNameItem('Forms');
    await this.page.waitForTimeout(1000);
    await this.datePickerMenuItem.click();
  }

  async smartTablePage() {
    await this.selectGroupNameItem('Tables & Data')
    await this.smartTableMenuItem.click();
  }

  async toastPage() {
    await this.selectGroupNameItem('Modal & Overlays')
    await this.toastMenuItem.click();
  }

  async tooltipPage() {
    await this.selectGroupNameItem('Modal & Overlays')
    await this.tooltipMenuItem.click();
  }

  private async selectGroupNameItem(groupItemTitle: string) {
    const groupManuItem = this.page.getByTitle(groupItemTitle)
    const expendedState = await groupManuItem.getAttribute('aria-expanded');

    if (expendedState == 'false') {
      await groupManuItem.click();
    }
  }

}
