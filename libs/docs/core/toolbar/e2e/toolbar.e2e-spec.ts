import { ToolbarPo } from './toolbar.po';
import {
    browserIsSafari,
    checkElementScreenshot,
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementPlaceholder,
    getImageTagBrowserPlatform,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { currentDay, date, fruitArr, placeholder, testText } from './toolbar-contents';

describe('Toolbar test suite', () => {
    const toolbarPage = new ToolbarPo();
    const {
        activeInfoToolbar,
        overflowButton,
        overflowPriorityButton,
        moreButton,
        overflowBody,
        alwaysButton,
        overflowGroupingButton,
        checkbox,
        dropdownMenu,
        dropdownOption,
        inputFieldText,
        selectedHours,
        selectedMinutes,
        navigationUpArrowButton,
        navigationDownArrowButton,
        timeColumn,
        period,
        clickDayInCalendarButtonByValue,
        dateTimeButton,
        okButton,
        dateTimeInput,
        overflowPriorityExample,
        overflowGroupingExample,
        toolbarOverflowExample,
        popoverInput,
        popoverButton,
        popoverToggledButton,
        popoverSplitButton,
        popoverDropDown,
        overflowInput
    } = toolbarPage;

    beforeAll(() => {
        toolbarPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(toolbarPage.root);
        waitForElDisplayed(toolbarPage.title);
    }, 2);

    it('verify info active toolbar is clickable', () => {
        scrollIntoView(activeInfoToolbar);
        expect(isElementClickable(activeInfoToolbar)).toBe(true, 'info active toolbar is not clickable');
    });

    describe('Check Toolbar Overflow example', () => {
        it('verify all buttons are clickable', () => {
            checkClickableButton(overflowButton);
        });

        xit('verify checkbox', () => {
            const checkboxSquareTag = 'checkbox-square-';
            const checkboxTickTag = 'checkbox-tick-';
            scrollIntoView(checkbox);
            click(checkbox);
            saveElementScreenshot(
                checkbox,
                checkboxSquareTag + getImageTagBrowserPlatform(),
                toolbarPage.getScreenshotFolder()
            );
            expect(
                checkElementScreenshot(
                    checkbox,
                    checkboxSquareTag + getImageTagBrowserPlatform(),
                    toolbarPage.getScreenshotFolder()
                )
            ).toBeLessThan(5, `element item state mismatch`);
            click(checkbox);
            saveElementScreenshot(
                checkbox,
                checkboxTickTag + getImageTagBrowserPlatform(),
                toolbarPage.getScreenshotFolder()
            );
            expect(
                checkElementScreenshot(
                    checkbox,
                    checkboxTickTag + getImageTagBrowserPlatform(),
                    toolbarPage.getScreenshotFolder()
                )
            ).toBeLessThan(5, `element item state mismatch`);
        });

        it('verify dropdown menu', () => {
            scrollIntoView(dropdownMenu);
            click(dropdownMenu);
            const optionLength = getElementArrayLength(dropdownOption);
            for (let i = 0; i < optionLength; i++) {
                click(dropdownOption, i);
                expect(getText(inputFieldText).trim()).toBe(fruitArr[i]);
                if (i !== 3) {
                    click(dropdownMenu);
                }
            }
        });

        it('verify date time picker example', () => {
            if (browserIsSafari()) {
                // not working correctly
                return;
            }
            scrollIntoView(dateTimeButton);
            click(dateTimeButton);
            clickDayInCalendarButtonByValue(currentDay);
            selectHoursMinutesAndPeriod();
            click(okButton);
            expect(getValue(dateTimeInput)).toEqual(date);
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7234
        xit('verify popover split button', () => {
            scrollIntoView(toolbarOverflowExample + moreButton);
            click(toolbarOverflowExample + moreButton);
            expect(getAttributeByName(popoverDropDown, 'aria-expanded')).toBe('false');
            click(popoverSplitButton);
            expect(getAttributeByName(popoverDropDown, 'aria-expanded')).toBe('true');
        });

        it('verify popover input has placeholder', () => {
            scrollIntoView(toolbarOverflowExample + moreButton);
            if (getElementArrayLength(overflowInput) === 2) {
                expect(getElementPlaceholder(overflowInput, 1)).toBe(placeholder);
            }
            if (getElementArrayLength(overflowInput) === 1) {
                click(toolbarOverflowExample + moreButton);
                waitForPresent(popoverInput);
                expect(getElementPlaceholder(popoverInput)).toBe(placeholder);
            }
        });

        it('verify that possible enter value popover input', () => {
            scrollIntoView(toolbarOverflowExample + moreButton);
            if (getElementArrayLength(overflowInput) === 2) {
                setValue(overflowInput, testText, 1);
                expect(getValue(overflowInput, 1)).toBe(testText);
            }
            if (getElementArrayLength(overflowInput) === 1) {
                click(toolbarOverflowExample + moreButton);
                waitForPresent(popoverInput);
                setValue(popoverInput, testText);
                expect(getValue(popoverInput)).toBe(testText);
            }
        });

        it('verify popover buttons are clickable', () => {
            scrollIntoView(toolbarOverflowExample + moreButton);
            click(toolbarOverflowExample + moreButton);
            checkClickableButton(popoverButton);
        });

        it('verify popover toggle buttons are work correctly', () => {
            scrollIntoView(toolbarOverflowExample + moreButton);
            click(toolbarOverflowExample + moreButton);
            const toggleButtonLength = getElementArrayLength(popoverToggledButton);
            for (let i = 0; i < toggleButtonLength; i++) {
                click(popoverToggledButton, i);
                expect(getAttributeByName(popoverToggledButton, 'aria-pressed', i)).toBe('true');
            }
        });
    });

    describe('Check Toolbar Overflow Priority', () => {
        it('should check Toolbar Overflow Priority example', () => {
            checkClickableButton(overflowPriorityButton);
            click(overflowPriorityExample + moreButton);
            expect(isElementDisplayed(overflowBody)).toBe(true, 'overflow body id not displayed');
            expect(isElementClickable(alwaysButton)).toBe(true, 'button is not clickable');
        });
    });

    describe('Check Toolbar Overflow Grouping', () => {
        it('should check Toolbar Overflow Grouping example', () => {
            checkClickableButton(overflowGroupingButton);
            click(overflowGroupingExample + moreButton);
            expect(isElementDisplayed(overflowBody)).toBe(true, 'overflow body id not displayed');
            expect(isElementClickable(alwaysButton)).toBe(true, 'button is not clickable');
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            toolbarPage.checkRtlSwitch();
        });
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', () => {
            toolbarPage.saveExampleBaselineScreenshot();
            expect(toolbarPage.compareWithBaseline()).toBeLessThan(7);
        });
    });

    function selectHoursMinutesAndPeriod(hour: number = 11, minute: number = 1): void {
        while (getText(selectedHours) !== hour.toString()) {
            click(navigationUpArrowButton);
        }
        click(timeColumn, 1);
        while (getText(selectedMinutes) !== minute.toString()) {
            click(navigationDownArrowButton);
        }
        click(timeColumn, 2);
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
