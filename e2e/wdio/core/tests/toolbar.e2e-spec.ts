import { ToolbarPo } from '../pages/toolbar.po';
import {
    checkElementScreenshot,
    click,
    getElementArrayLength, getImageTagBrowserPlatform, getText, getValue,
    isElementClickable, isElementDisplayed,

    refreshPage, saveElementScreenshot, scrollIntoView
} from '../../driver/wdio';
import {
    fruitArr, currentDay, date
} from '../fixtures/appData/toolbar-contents';

describe('Toolbar test suite', function() {
    const toolbarPage = new ToolbarPo();
    const {
        activeInfoToolbar, overflowButton, overflowPriorityButton, moreButton, overflowBody, alwaysButton,
        overflowGroupingButton, checkbox, dropdownMenu, dropdownOption, inputFieldText, selectedHours, selectedMinutes,
        navigationUpArrowButton, navigationDownArrowButton, timeItem, period, dayInCalendarButtonByValue,
        dateTimeButton, okButton, dateTimeInput, overflowPriorityExample, overflowGroupingExample
    } = toolbarPage;

    beforeAll(() => {
        toolbarPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 2);

    it('verify info active toolbar is clickable', () => {
        scrollIntoView(activeInfoToolbar);
        expect(isElementClickable(activeInfoToolbar)).toBe(true, 'info active toolbar is not clickable');
    });

    describe('Check Toolbar Overflow example', function() {

        it('verify all buttons are clickable', () => {
            checkClickableButton(overflowButton);
        });

        it('verify checkbox', () => {
            const checkboxSquareTag = 'checkbox-square-';
            const checkboxTickTag = 'checkbox-tick-';
            scrollIntoView(checkbox);
            click(checkbox);
            saveElementScreenshot(checkbox, checkboxSquareTag + getImageTagBrowserPlatform(), toolbarPage.getScreenshotFolder());
            expect(checkElementScreenshot(checkbox, checkboxSquareTag + getImageTagBrowserPlatform(),
                toolbarPage.getScreenshotFolder())).toBeLessThan(5, `element item state mismatch`);
            click(checkbox);
            saveElementScreenshot(checkbox, checkboxTickTag + getImageTagBrowserPlatform(), toolbarPage.getScreenshotFolder());
            expect(checkElementScreenshot(checkbox, checkboxTickTag + getImageTagBrowserPlatform(),
                toolbarPage.getScreenshotFolder())).toBeLessThan(5, `element item state mismatch`);
        });

        it('verify dropdown menu', () => {
            scrollIntoView(dropdownMenu);
            click(dropdownMenu);
            const optionLength = getElementArrayLength(dropdownOption);
            for (let i = 0; i < optionLength; i++) {
                click(dropdownOption, i);
                expect(getText(inputFieldText)).toBe(fruitArr[i]);
                if (i !== 3) {
                    click(dropdownMenu);
                }
            }
        });

        it('verify popover date time picker example', () => {
            scrollIntoView(dateTimeButton);
            click(dateTimeButton);
            click(dayInCalendarButtonByValue(currentDay.toString()));
            selectHoursMinutesAndPeriod();
            click(okButton);
            expect(getValue(dateTimeInput)).toEqual(date);
        });

    });

    describe('Check Toolbar Overflow Priority', function() {

        it('should check Toolbar Overflow Priority example', () => {
            checkClickableButton(overflowPriorityButton);
            click(overflowPriorityExample + moreButton);
            expect(isElementDisplayed(overflowBody)).toBe(true, 'overflow body id not displayed');
            expect(isElementClickable(alwaysButton)).toBe(true, 'button is not clickable');
        });
    });

    describe('Check Toolbar Overflow Grouping', function() {

        it('should check Toolbar Overflow Grouping example', () => {
            checkClickableButton(overflowGroupingButton);
            click(overflowGroupingExample + moreButton);
            expect(isElementDisplayed(overflowBody)).toBe(true, 'overflow body id not displayed');
            expect(isElementClickable(alwaysButton)).toBe(true, 'button is not clickable');
        });
    });

    describe('Check orientation', function() {

        it('should check RTL and LTR orientation', () => {
            toolbarPage.checkRtlSwitch();
        });
    });

    describe('Should check visual regression', function() {

        it('should check visual regression for all examples', () => {
            toolbarPage.saveExampleBaselineScreenshot();
            expect(toolbarPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function selectHoursMinutesAndPeriod(hour: number = 11, minute: number = 1): void {
        while (getText(selectedHours) !== hour.toString()) {
            click(navigationUpArrowButton);
        }
        click(timeItem, 1);
        while (getText(selectedMinutes) !== minute.toString()) {
            click(navigationDownArrowButton);
        }
        click(timeItem, 2);
        click(period);
    }
});

function checkClickableButton(selector: string): void {
    const count = getElementArrayLength(selector);
    for (let i = 0; i < count; i++) {
        scrollIntoView(selector, i);
        expect(isElementClickable(selector)).toBe(true, `button with index ${i} not clickable`);
    }
}


