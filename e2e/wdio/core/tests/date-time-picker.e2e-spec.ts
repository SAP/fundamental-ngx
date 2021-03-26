import {
    addIsActiveClass,
    checkElementScreenshot, clearValue,
    click,
    elementArray,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    getValue, isElementClickable,
    isElementDisplayed, mouseHoverElement,
    refreshPage, saveElementScreenshot,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import {
    buttonActiveState,
    button,
    buttonFocusState,
    buttonHoverState,
    inputFieldActiveState,
    inputField,
    inputFieldFocusState,
    inputFieldHoverState,
    changeButton,
    buttonChangeHoverState,
    buttonChangeActiveState,
    buttonChangeFocusState,
    buttonOption,
    optionButtonHoverState,
    optionButtonActiveState,
    optionButtonFocusState,
    optionCountry
} from '../fixtures/testData/date-time-picker-tags';
import { DateTimePicker } from '../pages/date-time-picker.po';
import {
    year2030,
    highlightedColor,
    text,
    date,
    date2,
    date3,
    date4,
    dates,
    i18n,
    currentDay,
    btn,
    input
} from '../fixtures/testData/date-time-picker';


describe('Datetime picker suite', function() {
    const dateTimePickerPage = new DateTimePicker();
    const {
        datePickerInput, datePickerButton, activeDateTimePickerButton, calendarExpanded,
        activeDateTimePickerInput, topPage, selectYearButton, selectMonthButton, calendarYearsSection, disabledDateTimePickerButton,
        disabledDateTimePickerInput, okButton, filterCalendarValue, buttonSelectYearsRange, buttonFirstRangeYear, buttonFirstYear,
        buttonFirstMonth, selectedHours, selectedMinutes, navigationDownArrowButton, navigationUpArrowButton, timeItem, period,
        cancelButton, buttonChange, optionButton, countryOption, activeDay, dayInCalendarButtonByValue, getOptionByName
    } = new DateTimePicker();

    beforeAll(() => {
        dateTimePickerPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(datePickerInput);
    }, 1);

    it('verify in all the form factor user is able to see the date picker button and input field', () => {
        const buttonsLength = getElementArrayLength(datePickerButton);
        const inputsLength = getElementArrayLength(datePickerInput);
        expect(buttonsLength).toEqual(inputsLength);
        for (let i = 1; i < buttonsLength; i++) {
            expect(isElementDisplayed(datePickerButton, i)).toBe(true);
            expect(isElementDisplayed(datePickerInput, i)).toBe(true);
        }
    });

    it('verify calendar by clicking on the date time picker button', () => {
        const activeButtonsLength = getElementArrayLength(activeDateTimePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeDateTimePickerButton, i);
            click(activeDateTimePickerButton, i);
            expect(isElementDisplayed(calendarExpanded)).toBe(true);
        }
    });

    it('verify from the day view on the calendar, clicking or tapping a year', () => {
        sendKeys(['Escape']);
        click(activeDateTimePickerButton, 1);
        expect(waitForElDisplayed(calendarExpanded)).toBe(true);
        scrollIntoView(topPage);
        scrollIntoView(selectYearButton);
        click(selectYearButton);
        expect(waitForElDisplayed(calendarYearsSection)).toBe(true);
        click(dateTimePickerPage.yearInCalendarByValue(year2030));
        expect(getText(selectYearButton)).toBe(year2030.toString());
    });

    it('verify by default today date is focused', () => {
        const activeButtonsLength = getElementArrayLength(activeDateTimePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeDateTimePickerButton, i);
            click(activeDateTimePickerButton, i);
            expect(isElementDisplayed(calendarExpanded)).toBe(true);
            expect(getText(activeDay)).toBe(new Date().getDate().toString());
        }
    });

    it('verify on click on the input field', () => {
        const activeInputsLength = getElementArrayLength(activeDateTimePickerInput);
        for (let i = 0; i < activeInputsLength; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeDateTimePickerInput, i);
            setValue(activeDateTimePickerInput, text, i);
            expect(getValue(activeDateTimePickerInput, i)).toBe(text);
        }
    });

    it('verify date input field have placeholder', () => {
        const inputs = elementArray(datePickerInput);
        for (let i = 0; i < inputs.length; i++) {
            expect(['', null]).not.toContain(getAttributeByName(datePickerInput, 'ng-reflect-model', i));
        }
    });

    it('verify selected date is showing in blue background', () => {
        click(activeDateTimePickerButton, 1);
        click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
        click(okButton);
        click(activeDateTimePickerButton, 1);
        expect(highlightedColor)
            .toContain(getCSSPropertyByName(dateTimePickerPage.dayInCalendarButtonByValue('1'), 'background-color').value);
    });

    it('verify The user can then choose the desired date from the calendar, and the time from the rotating wheel, ' +
        'For the time, it’s possible to select hours, minutes, and even seconds.', () => {
        click(activeDateTimePickerButton, 1);
        click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
        selectHoursMinutesAndPeriod();
        click(okButton);
        expect(getAttributeByName(activeDateTimePickerInput, 'ng-reflect-model'))
            .toEqual(date);
    });

    it('verify When the user selects cancel the action is aborted and the input field remains unchanged.', () => {
        click(activeDateTimePickerButton, 1);
        click(dateTimePickerPage.dayInCalendarButtonByValue('1'));
        selectHoursMinutesAndPeriod();
        click(cancelButton);
        expect(getAttributeByName(activeDateTimePickerInput, 'ng-reflect-model'))
            .not.toEqual(date);
    });

    it('verify disabled date time picker', () => {
        const disabledButtonsArr = elementArray(disabledDateTimePickerButton);
        for (let i = 0; i < disabledButtonsArr.length; i++) {
            expect(isElementClickable(disabledDateTimePickerButton, i)).toBe(false);
            expect(isElementClickable(disabledDateTimePickerInput, i)).toBe(false);
        }
    });

    it('verify selecting a year range navigates back to the year view', () => {
        const activeButtonsLength = getElementArrayLength(activeDateTimePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            click(activeDateTimePickerButton, i);
            click(selectYearButton);
            click(buttonSelectYearsRange);
            waitForElDisplayed(filterCalendarValue('aggregated-year'));
            click(buttonFirstRangeYear);
            waitForElDisplayed(filterCalendarValue('year'));
            click(activeDateTimePickerButton, i);
        }
    });

    it('verify after the user selects a year, the view changes back to the day view', () => {
        const activeButtonsLength = getElementArrayLength(activeDateTimePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            click(activeDateTimePickerButton, i);
            click(selectYearButton);
            waitForElDisplayed(filterCalendarValue('year'));
            click(buttonFirstYear);
            waitForElDisplayed(filterCalendarValue('day'));
            click(activeDateTimePickerButton, i);
        }
    });

    it('verify after the user selects a month, the view changes back to the day view', () => {
        const activeButtonsLength = getElementArrayLength(activeDateTimePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            click(activeDateTimePickerButton, i);
            click(selectMonthButton);
            waitForElDisplayed(filterCalendarValue('month'));
            click(buttonFirstMonth);
            waitForElDisplayed(filterCalendarValue('day'));
            click(activeDateTimePickerButton, i);
        }
    });

    it('verify simple datetime picker has correct default date', () => {
        click(activeDateTimePickerButton, 1);
        click(dayInCalendarButtonByValue(currentDay.toString()));
        selectHoursMinutesAndPeriod();
        click(okButton);
        expect(getAttributeByName(activeDateTimePickerInput, 'ng-reflect-model'))
            .toEqual(date2);
    });

    it('verify programmatic change datetime picker has correct default date', () => {
        scrollIntoView(activeDateTimePickerButton, 2);
        click(activeDateTimePickerButton, 2);
        click(dayInCalendarButtonByValue(currentDay.toString()));
        selectHoursMinutesAndPeriod();
        click(okButton);
        expect(getAttributeByName(activeDateTimePickerInput, 'ng-reflect-model', 1))
            .toEqual(date2);
        click(buttonChange);
        expect(getAttributeByName(activeDateTimePickerInput, 'ng-reflect-model', 1))
            .toEqual(date3);
    });

    it('verify null validity datetime picker has correct default date', () => {
        scrollIntoView(activeDateTimePickerButton, 3);
        click(activeDateTimePickerButton, 3);
        click(dayInCalendarButtonByValue(currentDay.toString()));
        selectHoursMinutesAndPeriod();
        click(okButton);
        expect(getAttributeByName(activeDateTimePickerInput, 'ng-reflect-model', 2))
            .toEqual(date2);
    });

    it('verify formatting datetime picker has correct default date', () => {
        scrollIntoView(activeDateTimePickerButton, 4);
        click(activeDateTimePickerButton, 4);
        click(dayInCalendarButtonByValue(currentDay.toString()));
        selectHoursAndMinutes();
        click(okButton);
        expect(getAttributeByName(activeDateTimePickerInput, 'ng-reflect-model', 3))
            .toEqual(date4);
    });

    it('verify date time picker in reactive form has correct default date', () => {
        scrollIntoView(activeDateTimePickerButton, 5);
        click(activeDateTimePickerButton, 5);
        click(dayInCalendarButtonByValue(currentDay.toString()));
        selectHoursMinutesAndPeriod();
        click(okButton);
        expect(getAttributeByName(activeDateTimePickerInput, 'ng-reflect-model', 4))
            .toEqual(date2);
    });

    it('verify date time picker i18n example', () => {
        scrollIntoView(activeDateTimePickerButton, 6);
        for (let i = 0; i < i18n.length; i++) {
            click(optionButton);
            click(getOptionByName(i18n[i]));
            click(activeDateTimePickerButton, 6);
            waitForElDisplayed(calendarExpanded);
            scrollIntoView(dayInCalendarButtonByValue(currentDay.toString()));
            click(dayInCalendarButtonByValue(currentDay.toString()));
            selectHoursAndMinutes();
            click(okButton);
            expect(getAttributeByName(activeDateTimePickerInput, 'ng-reflect-model', 5))
                .toContain(dates[i]);
        }
    });

    it('should check LTR and RTL orientation', () => {
        dateTimePickerPage.checkRtlSwitch();
    });


    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            dateTimePickerPage.saveExampleBaselineScreenshot();
            expect(dateTimePickerPage.compareWithBaseline()).toBeLessThan(4);
        });

        it('should check input fields hover state', () => {
            const inputsLength = getElementArrayLength(activeDateTimePickerInput);
            for (let i = 0; i < inputsLength; i++) {
                scrollIntoView(activeDateTimePickerInput, i);
                clearValue(activeDateTimePickerInput, i);
                checkButtonHoverState(activeDateTimePickerInput, inputField + inputFieldHoverState + '-' + i,
                    input, i);
            }
        });

        it('should check input fields active state', () => {
            const inputsLength = getElementArrayLength(activeDateTimePickerInput);
            for (let i = 0; i < inputsLength; i++) {
                scrollIntoView(activeDateTimePickerInput, i);
                clearValue(activeDateTimePickerInput, i);
                checkButtonActiveState(activeDateTimePickerInput, inputField + inputFieldActiveState + '-' + i,
                    input, i);
            }
        });

        it('should check input fields focus state', () => {
            const inputsLength = getElementArrayLength(activeDateTimePickerInput);
            for (let i = 0; i < inputsLength; i++) {
                scrollIntoView(activeDateTimePickerInput, i);
                clearValue(activeDateTimePickerInput, i);
                checkButtonFocusState(activeDateTimePickerInput, inputField + inputFieldFocusState + '-' + i,
                    input, i);
            }
        });

        it('should check date picker button hover state', () => {
            const buttonsLength = getElementArrayLength(activeDateTimePickerButton);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(activeDateTimePickerButton, i);
                checkButtonHoverState(activeDateTimePickerButton, button + buttonHoverState + '-' + i,
                    btn, i);
            }
        });

        it('should check date picker button active state', () => {
            const buttonsLength = getElementArrayLength(activeDateTimePickerButton);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(activeDateTimePickerButton, i);
                checkButtonActiveState(activeDateTimePickerButton, button + buttonActiveState + '-' + i,
                    btn, i);
            }
        });

        it('should check date picker button focus state', () => {
            const buttonsLength = getElementArrayLength(activeDateTimePickerButton);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(activeDateTimePickerButton, i);
                checkButtonFocusState(activeDateTimePickerButton, button + buttonFocusState + '-' + i,
                    btn, i);
                click(activeDateTimePickerButton, i);
            }
        });

        it('should check change button hover state', () => {
            scrollIntoView(buttonChange);
            checkButtonHoverState(buttonChange, changeButton + buttonChangeHoverState, btn);
        });

        it('should check change button active state', () => {
            scrollIntoView(buttonChange);
            checkButtonActiveState(buttonChange, changeButton + buttonChangeActiveState, btn);
        });

        it('should check change button focus state', () => {
            scrollIntoView(buttonChange);
            checkButtonFocusState(buttonChange, changeButton + buttonChangeFocusState, btn);
        });

        it('should check option button hover state', () => {
            scrollIntoView(optionButton);
            checkButtonHoverState(optionButton, buttonOption + optionButtonHoverState, btn);
        });

        it('should check option button active state', () => {
            scrollIntoView(optionButton);
            checkButtonActiveState(optionButton, buttonOption + optionButtonActiveState, btn);
        });

        it('should check option button focus state', () => {
            scrollIntoView(optionButton);
            checkButtonFocusState(optionButton, buttonOption + optionButtonFocusState, btn);
        });


        it('should check country option focus state', () => {
            scrollIntoView(optionButton);
            click(optionButton);
            saveElementScreenshot(countryOption, optionCountry, dateTimePickerPage.getScreenshotFolder());
            expect(checkElementScreenshot(countryOption, optionCountry, dateTimePickerPage.getScreenshotFolder()))
                .toBeLessThan(2, `Country option state mismatch`);
        });

    });

    function selectHoursAndMinutes(hour: number = 1, minute: number = 1): void {
        while (getText(selectedHours) !== hour.toString()) {
            click(navigationUpArrowButton);
        }
        click(timeItem, 1);
        while (getText(selectedMinutes) !== minute.toString()) {
            click(navigationDownArrowButton);
        }
    }

    function checkButtonHoverState(selector: string, tag: string, btnName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag, dateTimePickerPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, dateTimePickerPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${btnName} button hover state mismatch`);
    }

    function checkButtonFocusState(selector: string, tag: string, btnName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag, dateTimePickerPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, dateTimePickerPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${btnName} button focus state mismatch`);
    }

    function checkButtonActiveState(selector: string, tag: string, btnName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag, dateTimePickerPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, dateTimePickerPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${btnName} button item ${index} active state mismatch`);
    }

    function selectHoursMinutesAndPeriod(hour: number = 1, minute: number = 1): void {
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


