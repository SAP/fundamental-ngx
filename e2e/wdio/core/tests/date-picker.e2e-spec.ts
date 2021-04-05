import {
    addIsActiveClass,
    checkElementScreenshot,
    clearValue,
    click,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getImageTagBrowserPlatform,
    getText,
    getValue,
    mouseHoverElement,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { DatePicker } from '../pages/date-picker.po';
import {
    text,
    year2021,
    firstSimpleDatePickerIndex,
    secondSimpleDatePickerIndex,
    secondSimpleDatePickerDate,
    rangeDatePickerIndex,
    rangeDatePicker,
    internationalizationIndex,
    internationalizationDate,
    internationalizationGerman,
    internationalizationBulgarian,
    firstFormatterDate,
    firstFormatterIndex,
    secondFormatterIndex,
    secondFormatterDate,
    nullValidityIndex,
    reactiveFormIndex,
    reactiveFormRoDIndex,
    reactiveFormRoDDate,
    reactiveFormDisableIndex,
    reactiveFormDisableDate,
    reactiveFormDisableRoDIndex,
    reactiveFormDisableRoDDate,
    positionIndex,
    date,
    highlightedColor,
    button,
    input,
    currentYear,
    currentMonthWithZero, currentMonth
} from '../fixtures/appData/date-picker-contents';

import {
    activeBtnDatePicker,
    activeDivDatePicker,
    bulgarianButton,
    frenchButton,
    germanButton,
} from '../fixtures/testData/date-picker-tags';

describe('Date picker suite', function() {
    const datePickerPage = new DatePicker();
    const {
        buttonDatePicker, buttonBulgarian, buttonGerman,
        inputDatePicker, activeButtonDatePicker, activeInputDatePicker, calendarExpanded, calendarYearsSection, buttonSelectMonth,
        buttonSelectYear, buttonSelectYearsRange, yearInCalendarByValue, currentDay, dayInCalendarButtonByValue, activeDatePicker,
        filterCalendarValue, buttonFirstYear, buttonFirstRangeYear, buttonFirstMonth, selectedDate, disabledDivDatePicker,
        buttonFrench
    } = datePickerPage;

    beforeAll(() => {
        datePickerPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(inputDatePicker);
    }, 1);

    it('Verify in all the form factor user is able to see the date picker button and input field ', () => {
        const buttonsLength = getElementArrayLength(buttonDatePicker);
        const inputsLength = getElementArrayLength(inputDatePicker);
        for (let i = 1; i < buttonsLength; i++) {
            waitForElDisplayed(buttonDatePicker, i);
            waitForElDisplayed(inputDatePicker, i);
        }
        expect(buttonsLength).toEqual(inputsLength);
    });

    it('Verify on click on the date picker button date-picker', () => {
        const activeButtonsLength = getElementArrayLength(activeButtonDatePicker);
        for (let i = 1; i < activeButtonsLength; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeButtonDatePicker, i);
            click(activeButtonDatePicker, i);
            waitForElDisplayed(calendarExpanded);
        }
    });

    it('Verify By clicking the current year date-picker', () => {
        sendKeys(['Escape']);
        scrollIntoView(activeButtonDatePicker);
        click(activeButtonDatePicker);
        expect(waitForElDisplayed(calendarExpanded)).toBe(true);
        scrollIntoView(buttonSelectYear);
        click(buttonSelectYear);
        expect(waitForElDisplayed(calendarYearsSection)).toBe(true);
        click(yearInCalendarByValue(year2021));
        expect(getText(buttonSelectYear)).toBe(year2021.toString());
    });

    it('Verify by default today date is focused date-picker', () => {
        const activeButtonsLength = getElementArrayLength(activeButtonDatePicker);
        for (let i = 0; i < activeButtonsLength; i++) {
            if (i === 8) {
                continue;
            }
                sendKeys(['Escape']);
                scrollIntoView(activeButtonDatePicker, i);
                click(activeButtonDatePicker, i);
                waitForElDisplayed(calendarExpanded);
                expect(getText(currentDay)).toBe(new Date().getDate().toString());
        }
    });

    it('Verify on click on the input field date-picker', () => {
        const activeInputsLength = getElementArrayLength(activeInputDatePicker);
        for (let i = 0; i < activeInputsLength; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeInputDatePicker, i);
            setValue(activeInputDatePicker, text, i);
            expect(getValue(activeInputDatePicker, i)).toBe(text);
        }
    });

    it('Verify date input field have placeholder date-picker', () => {
        const inputsLength = getElementArrayLength(inputDatePicker);
        for (let i = 0; i < inputsLength; i++) {
            expect(getAttributeByName(inputDatePicker, 'placeholder', i)).toBeDefined();
        }
    });

    it('should check LTR and RTL orientation date-picker', () => {
        datePickerPage.checkRtlSwitch();
    });

    it('verify simple date-picker', () => {
        click(activeButtonDatePicker, firstSimpleDatePickerIndex);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model')).toEqual(date);
        expect(getText(selectedDate)).toEqual(`Selected Date: ${currentYear}-${currentMonthWithZero}-01`);
    });

    it('verify compact date-picker', () => {
        click(activeButtonDatePicker, secondSimpleDatePickerIndex);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model')).toEqual(secondSimpleDatePickerDate);
        expect(getText(selectedDate, 1)).toEqual(`Selected Date: ${currentYear}-${currentMonthWithZero}-01`);

    });

    it('verify range date-picker ', () => {
        click(activeButtonDatePicker, rangeDatePickerIndex);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', rangeDatePickerIndex)).toEqual(rangeDatePicker);
        expect(getText(selectedDate, 2)).toEqual(`Selected First Date: ${currentYear}-${currentMonthWithZero}-01`);
        expect(getText(selectedDate, 3)).toEqual(`Selected Last Date: ${currentYear}-${currentMonthWithZero}-15`);
    });

    it('verify internationalization date-picker', () => {
        click(activeButtonDatePicker, internationalizationIndex);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 3)).toEqual(internationalizationDate);
        click(buttonGerman);
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 3)).toEqual(internationalizationGerman);
        click(buttonBulgarian);
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 3)).toEqual(internationalizationBulgarian);
    });

    it('verify formatter date-picker', () => {
        click(activeButtonDatePicker, firstFormatterIndex);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 4)).toEqual(firstFormatterDate);
        expect(getText(selectedDate, 4)).toEqual(`Selected Date: ${currentYear}-${currentMonthWithZero}-01`);

        click(activeButtonDatePicker, secondFormatterIndex);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 5)).toEqual(secondFormatterDate);
    });

    it('verify null validity date-picker', () => {
        click(activeButtonDatePicker, nullValidityIndex);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 6)).toEqual(date);
    });

    it('verify date picker in reactive form', () => {
        click(activeButtonDatePicker, reactiveFormIndex);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 7)).toEqual(date);
    });

    it('verify date picker in reactive form with a range of dates', () => {
        click(activeButtonDatePicker, reactiveFormRoDIndex);
        click(dayInCalendarButtonByValue('1'));
        click(dayInCalendarButtonByValue('15'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 8)).toEqual(reactiveFormRoDDate);
    });

    it('verify date picker reactive form with disable function', () => {
        click(activeButtonDatePicker, reactiveFormDisableIndex);
        click(dayInCalendarButtonByValue(new Date().getDate().toString()));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 9)).toEqual(reactiveFormDisableDate);
    });

    it('verify date picker range in reactive form with disable functions.', () => {
        click(activeButtonDatePicker, reactiveFormDisableRoDIndex);
        click(dayInCalendarButtonByValue(new Date().getDate().toString()));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 10)).toEqual(reactiveFormDisableRoDDate);

    });

    it('verify date picker position', () => {
        click(activeButtonDatePicker, positionIndex);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model', 11)).toEqual(date);
        click(activeButtonDatePicker, positionIndex);
    });

    it('verify with the date picker, the user can see a day view, month view, year view, or year ranges.', () => {
        const buttonsLength = getElementArrayLength(activeButtonDatePicker);
        for (let i = 1; i < buttonsLength; i++) {
            click(activeButtonDatePicker, i);
            waitForElDisplayed(filterCalendarValue('day'));
            click(buttonSelectMonth);
            waitForElDisplayed(filterCalendarValue('month'));
            click(buttonSelectYear);
            waitForElDisplayed(filterCalendarValue('year'));
            click(buttonSelectYearsRange);
            waitForElDisplayed(filterCalendarValue('aggregated-year'));
            click(activeButtonDatePicker, i);
        }
    });

    it('verify selected date is showing in blue background', () => {
        click(activeButtonDatePicker);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model')).toEqual(date);
        click(activeButtonDatePicker);
        expect(highlightedColor)
            .toContain(getCSSPropertyByName(dayInCalendarButtonByValue('1'), 'background-color').value);
    });

    it('verify selecting a year range navigates back to the year view', () => {
        const buttonsLength = getElementArrayLength(activeButtonDatePicker);
        for (let i = 1; i < buttonsLength; i++) {
            click(activeButtonDatePicker, i);
            click(buttonSelectYear);
            click(buttonSelectYearsRange);
            waitForElDisplayed(filterCalendarValue('aggregated-year'));
            click(buttonFirstRangeYear);
            waitForElDisplayed(filterCalendarValue('year'));
            click(activeButtonDatePicker, i);
        }
    });

    it('verify after the user selects a year, the view changes back to the day view. ', () => {
        const buttonsLength = getElementArrayLength(activeButtonDatePicker);
        for (let i = 1; i < buttonsLength; i++) {
            click(activeButtonDatePicker, i);
            click(buttonSelectYear);
            waitForElDisplayed(filterCalendarValue('year'));
            click(buttonFirstYear);
            waitForElDisplayed(filterCalendarValue('day'));
            click(activeButtonDatePicker, i);
        }
    });

    it('verify after the user selects a month, the view changes back to the day view. ', () => {
        const buttonsLength = getElementArrayLength(activeButtonDatePicker);
        for (let i = 1; i < buttonsLength; i++) {
            click(activeButtonDatePicker, i);
            click(buttonSelectMonth);
            waitForElDisplayed(filterCalendarValue('month'));
            click(buttonFirstMonth);
            waitForElDisplayed(filterCalendarValue('day'));
            click(activeButtonDatePicker, i);
        }
    });

    it('verify user is not able select multiple dates', () => {
        click(activeButtonDatePicker);
        click(dayInCalendarButtonByValue('1'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model')).toEqual(`${currentMonth}/1/2021`);
        click(activeButtonDatePicker);
        click(dayInCalendarButtonByValue('2'));
        expect(getAttributeByName(activeInputDatePicker, 'ng-reflect-model')).toEqual(`${currentMonth}/2/2021`);
    });

    it('verify disabled date-picker pickers', () => {
        const disabledDivDatePickerLength = getElementArrayLength(disabledDivDatePicker);
        for (let i = 0; i < disabledDivDatePickerLength; i++) {
            scrollIntoView(disabledDivDatePicker, i);
            expect(getAttributeByName(disabledDivDatePicker, 'class')).toContain('is-disabled');
        }
    });

    describe('Check visual regression', function() {

        // skipped for now due to the issue with selected date for disabled components
        xit('should check examples visual regression', () => {
            datePickerPage.saveExampleBaselineScreenshot();
            expect(datePickerPage.compareWithBaseline()).toBeLessThan(1);
        });

        it('should check active input visual regression', () => {
            const activeDatePickerLength = getElementArrayLength(activeDatePicker);
            for (let i = 0; i < activeDatePickerLength; i++) {
                scrollIntoView(activeDatePicker, i);
                clearValue(activeInputDatePicker, i);
                checkElementStates(activeDatePicker, activeDivDatePicker + i + '-', input, i);
            }
        });

        it('should check active button visual regression', () => {
            const activeButtonDatePickerLength = getElementArrayLength(buttonDatePicker);
            for (let i = 0; i < activeButtonDatePickerLength - 1; i++) {
                sendKeys(['Escape']);
                if (i === 8) {
                    continue;
                }
                scrollIntoView(buttonDatePicker, i);
                checkElementStates(buttonDatePicker, activeBtnDatePicker + i + '-', button, i);
            }
        });


        it('should check french button visual regression', () => {
            scrollIntoView(buttonFrench);
            checkElementStates(buttonFrench, frenchButton, button);
        });


        it('should check german button visual regression', () => {
            scrollIntoView(buttonGerman);
            checkElementStates(buttonGerman, germanButton, button);
        });

        it('should check bulgarian button visual regression', () => {
            scrollIntoView(buttonBulgarian);
            checkElementStates(buttonBulgarian, bulgarianButton, button);
        });
    });

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), datePickerPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), datePickerPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), datePickerPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), datePickerPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), datePickerPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), datePickerPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element item ${index} active state mismatch`);
    }

    function checkElementStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementFocusState(selector, tag + 'focus-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }

});

