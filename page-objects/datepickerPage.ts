import {expect, Page} from "@playwright/test";
import {HelperBase} from "./helperBase";

export class DatepickerPage extends HelperBase {

  constructor(page: Page) {
   super(page);
  }

  async selectCommonDatePickerDateFomToday(numberOfDaysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder('Form Picker');
    await calendarInputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday);

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder('Range Picker');
    await calendarInputField.click();
    const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday);
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday);
    const dateRangeToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;

    await expect(calendarInputField).toHaveValue(dateRangeToAssert);
  }

  private async selectDateInTheCalendar(numberOfDaysFromToday : number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'});
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'});
    const expectedDate = date.getDate().toString();
    const expectedYear = date.getFullYear().toString();
    let calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
    while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
      calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
    }
    await  this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click();
    return dateToAssert;
  }
}
