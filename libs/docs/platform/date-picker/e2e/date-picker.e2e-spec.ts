import {
    click,
    elementArray,
    getCSSPropertyByName,
    getElementClass,
    getElementPlaceholder,
    getText,
    getValue,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { DatePicker } from './date-picker.po';
import {
    date,
    date1,
    date10,
    date11,
    date12,
    date2,
    date3,
    date5,
    date8,
    date9,
    highlightedColor,
    text,
    year2025
} from './date-picker';

describe('Date picker suite', () => {
    const datePickerPage: DatePicker = new DatePicker();
    const {
        inputDatePicker,
        buttonDatePicker,
        calendarExpanded,
        calendarYearsSection,
        currentDay,
        buttonGerman,
        buttonBulgarian,
        buttonSelectYear,
        buttonSelectMonth,
        buttonSelectYearsRange,
        buttonFirstRangeYear,
        buttonFirstYear,
        buttonFirstMonth,
        filterCalendarValue,
        dayInCalendarButtonByValue,
        monthInCalendarByValue,
        yearInCalendarByValue
    } = datePickerPage;

    beforeAll(async () => {
        await datePickerPage.open();
        await waitForPresent(datePickerPage.root);
        await waitForElDisplayed(datePickerPage.title);
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(datePickerPage.root);
        await waitForElDisplayed(datePickerPage.title);
    }, 2);

    it('Verify in all the form factor user is able to see the date picker button and input field ', async () => {
        const buttons = await elementArray(buttonDatePicker);
        const inputs = await elementArray(inputDatePicker);
        await expect(buttons.length).toEqual(inputs.length);
        for (let i = 1; i < buttons.length; i++) {
            await waitForElDisplayed(buttonDatePicker);
            await waitForElDisplayed(inputDatePicker);
        }
    });

    it('Verify calendar is expanded on click on the date picker button', async () => {
        const activeButtons = await elementArray(buttonDatePicker);
        for (let i = 1; i < activeButtons.length; i++) {
            if (!(await getElementClass(buttonDatePicker, i)).includes('is-disabled')) {
                await sendKeys(['Escape']);
                await scrollIntoView(buttonDatePicker, i);
                await click(buttonDatePicker, i);
                await waitForElDisplayed(calendarExpanded);
            }
        }
    });

    it('Verify By clicking the current year', async () => {
        await sendKeys(['Escape']);
        await scrollIntoView(buttonDatePicker, 1);
        await click(buttonDatePicker, 1);
        await expect(await waitForElDisplayed(calendarExpanded)).toBe(true);
        await scrollIntoView(buttonSelectYear);
        await click(buttonSelectYear);
        await expect(await waitForElDisplayed(calendarYearsSection)).toBe(true);
        await click(yearInCalendarByValue(year2025));
        await expect(await getText(buttonSelectYear)).toBe(year2025.toString());
    });

    it('Verify by default today date is focused', async () => {
        const activeButtons = await elementArray(buttonDatePicker);
        for (let i = 4; i < activeButtons.length; i++) {
            if (!(await getElementClass(buttonDatePicker, i)).includes('is-disabled')) {
                await sendKeys(['Escape']);
                await scrollIntoView(buttonDatePicker, i);
                await click(buttonDatePicker, i);
                await waitForElDisplayed(calendarExpanded);
                await expect(await getText(currentDay, 0)).toContain(new Date().getDate().toString());
            }
        }
    });

    it('Verify on click on the input field ', async () => {
        const activeInputs = await elementArray(inputDatePicker);
        for (let i = 0; i < activeInputs.length; i++) {
            if (!(await getElementClass(buttonDatePicker, i)).includes('is-disabled')) {
                await sendKeys(['Escape']);
                await scrollIntoView(inputDatePicker, i);
                await setValue(inputDatePicker, text, i);
                await expect(await getValue(inputDatePicker, i)).toBe(text);
            }
        }
    });

    it('Verify date input field have placeholder', async () => {
        const inputs = await elementArray(inputDatePicker);
        for (let i = 0; i < inputs.length; i++) {
            await expect(await getElementPlaceholder(inputDatePicker, i)).toBeDefined();
        }
    });

    it('should check LTR and RTL orientation', async () => {
        await datePickerPage.checkRtlSwitch();
    });

    it('verify pre-populated single type date-picker', async () => {
        await click(buttonDatePicker);
        await click(dayInCalendarButtonByValue('1'));
        await expect(await getValue(inputDatePicker)).toEqual(date);
    });

    it('verify single type date-picker:', async () => {
        await click(buttonDatePicker, 3);
        await click(dayInCalendarButtonByValue('1'));
        await expect(await getValue(inputDatePicker, 3)).toEqual(date1);
    });

    it('verify pre-populated range type date-picker', async () => {
        await click(buttonDatePicker, 1);
        await click(dayInCalendarButtonByValue('1'));
        await click(dayInCalendarButtonByValue('15'));
        await click(buttonDatePicker, 1);
        await expect(await getValue(inputDatePicker, 1)).toEqual(date2);
    });

    it('verify range type date-picker', async () => {
        await click(buttonDatePicker, 4);
        await click(dayInCalendarButtonByValue('1'));
        await click(dayInCalendarButtonByValue('15'));
        await click(buttonDatePicker, 4);
        await expect(await getValue(inputDatePicker, 4)).toEqual(date3);
    });

    it('verify birth date date-picker', async () => {
        await click(buttonDatePicker, 5);
        await click(dayInCalendarButtonByValue('1'));
        await expect(await getValue(inputDatePicker, 5)).toEqual(date1);
    });

    it('verify holiday date-picker', async () => {
        await click(buttonDatePicker, 6);
        await click(dayInCalendarButtonByValue('1'));
        await click(dayInCalendarButtonByValue('15'));
        await click(buttonDatePicker, 6);
        await expect(await getValue(inputDatePicker, 6)).toEqual(date3);
    });

    it('verify date picker use outside Form', async () => {
        await click(buttonDatePicker, 8);
        await click(dayInCalendarButtonByValue('1'));
        await expect(await getValue(inputDatePicker, 8)).toEqual(date1);
    });

    it('verify range date picker outside form', async () => {
        await click(buttonDatePicker, 9);
        await click(dayInCalendarButtonByValue('1'));
        await click(dayInCalendarButtonByValue('15'));
        await click(buttonDatePicker, 9);
        await expect(await getValue(inputDatePicker, 9)).toEqual(date3);
    });

    it('verify disable parts of Calender for selection', async () => {
        await click(buttonDatePicker, 10);
        await click(dayInCalendarButtonByValue('1'));
        await expect(await getValue(inputDatePicker, 10)).toEqual(date1);
    });

    it('verify date Picker Formatting date picker with custom output format', async () => {
        await click(buttonDatePicker, 10);
        await click(dayInCalendarButtonByValue('1'));
        await expect(await getValue(inputDatePicker, 10)).toEqual(date5);
    });

    it('verify date Picker Formatting range date picker custom format', async () => {
        await click(buttonDatePicker, 12);
        await click(dayInCalendarButtonByValue('1'));
        await click(dayInCalendarButtonByValue('15'));
        await click(buttonDatePicker, 12);
        await expect(await getValue(inputDatePicker, 12)).toEqual(date10);
    });

    it('verify internationalization of Date Picker', async () => {
        await click(buttonDatePicker, 13);
        await click(buttonSelectYear);
        await waitForElDisplayed(calendarYearsSection);
        await click(yearInCalendarByValue(year2025));
        await click(buttonSelectMonth);
        await waitForElDisplayed(filterCalendarValue('month'));
        await click(monthInCalendarByValue(1));
        await click(dayInCalendarButtonByValue('1'));
        await expect(await getValue(inputDatePicker, 13)).toEqual(date11);
        await click(buttonGerman);
        await expect(await getValue(inputDatePicker, 13)).toEqual(date8);
        await click(buttonBulgarian);
        await expect(await getValue(inputDatePicker, 13)).toEqual(date12);
    });

    it('verify with the date picker, the user can see a day view, month view, year view, or year ranges.', async () => {
        const buttons = await elementArray(buttonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            if (!(await getElementClass(buttonDatePicker, i)).includes('is-disabled')) {
                await click(buttonDatePicker, i);
                await waitForElDisplayed(filterCalendarValue('day'));
                await click(buttonSelectMonth);
                await waitForElDisplayed(filterCalendarValue('month'));
                await click(buttonSelectYear);
                await waitForElDisplayed(filterCalendarValue('year'));
                await click(buttonSelectYearsRange);
                await waitForElDisplayed(filterCalendarValue('aggregated-years'));
                await click(buttonDatePicker, i);
            }
        }
    });

    it('verify selected date is showing in blue background', async () => {
        await click(buttonDatePicker);
        await click(dayInCalendarButtonByValue('1'));
        await expect(await getValue(inputDatePicker)).toEqual(date);
        await click(buttonDatePicker);
        await expect(highlightedColor).toContain(
            (
                await getCSSPropertyByName(dayInCalendarButtonByValue('1'), 'background-color')
            ).value
        );
    });

    it('verify selecting a year range navigates back to the year view', async () => {
        const buttons = await elementArray(buttonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            if (!(await getElementClass(buttonDatePicker, i)).includes('is-disabled')) {
                await click(buttonDatePicker, i);
                await click(buttonSelectYear);
                await click(buttonSelectYearsRange);
                await waitForElDisplayed(filterCalendarValue('aggregated-years'));
                await click(buttonFirstRangeYear);
                await waitForElDisplayed(filterCalendarValue('year'));
                await click(buttonDatePicker, i);
            }
        }
    });

    it('verify after the user selects a year, the view changes back to the day view. ', async () => {
        const buttons = await elementArray(buttonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            if (!(await getElementClass(buttonDatePicker, i)).includes('is-disabled')) {
                await click(buttonDatePicker, i);
                await click(buttonSelectYear);
                await waitForElDisplayed(filterCalendarValue('year'));
                await click(buttonFirstYear);
                await waitForElDisplayed(filterCalendarValue('day'));
                await click(buttonDatePicker, i);
            }
        }
    });

    it('verify after the user selects a month, the view changes back to the day view. ', async () => {
        const buttons = await elementArray(buttonDatePicker);
        for (let i = 1; i < buttons.length - 1; i++) {
            if (!(await getElementClass(buttonDatePicker, i)).includes('is-disabled')) {
                await click(buttonDatePicker, i);
                await click(buttonSelectMonth);
                await waitForElDisplayed(filterCalendarValue('month'));
                await click(buttonFirstMonth);
                await waitForElDisplayed(filterCalendarValue('day'));
                await click(buttonDatePicker, i);
            }
        }
    });

    it('verify user is not able select multiple dates', async () => {
        await click(buttonDatePicker);
        await click(dayInCalendarButtonByValue('1'));
        await expect(await getValue(inputDatePicker)).toEqual(date);
        await click(buttonDatePicker);
        await click(dayInCalendarButtonByValue('2'));
        await expect(await getValue(inputDatePicker)).toEqual(date9);
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await datePickerPage.saveExampleBaselineScreenshot();
            await expect(await datePickerPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
