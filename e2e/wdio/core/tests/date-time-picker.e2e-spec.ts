import {
    click,
    elementArray,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    getValue,
    isElementDisplayed, pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent,
    waitForUnclickable
} from '../../driver/wdio';

import { DateTimePicker } from '../pages/date-time-picker.po';
import { text } from '../fixtures/testData/date-time-picker';

let dateTimePickerPage: DateTimePicker;
const {datePickerInput, datePickerButton, activeDateTimePickerButton, calendarExpanded, currentDay,
    activeDateTimePickerInput} = new DateTimePicker();

describe('Datetime picker suite', function() {
    dateTimePickerPage = new DateTimePicker();

    beforeAll(() => {
        dateTimePickerPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(datePickerInput);
    }, 1);

    it('Verify in all the form factor user is able to see the date picker button and input field ', () => {
        const buttonsLength = getElementArrayLength(datePickerButton);
        const inputsLength = getElementArrayLength(datePickerInput);
        expect(buttonsLength).toEqual(inputsLength);
        for (let i = 1; i < buttonsLength; i++) {
            expect(isElementDisplayed(datePickerButton, i)).toBe(true);
            expect(isElementDisplayed(datePickerInput, i)).toBe(true);
        }
    });

    it('Verify on click on the date picker button', () => {
        const activeButtonsLength = getElementArrayLength(activeDateTimePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeDateTimePickerButton, i);
            click(activeDateTimePickerButton, i);
            expect(isElementDisplayed(calendarExpanded)).toBe(true);
        }
    });

    it('Verify by default today date is focused', () => {
        const activeButtonsLength = getElementArrayLength(activeDateTimePickerButton);
        for (let i = 1; i < activeButtonsLength; i++) {
            if (i !== 2 && i !== 6) {  // other default days in these calendars
                sendKeys(['Escape']);
                scrollIntoView(activeDateTimePickerButton, i);
                click(activeDateTimePickerButton, i);
                expect(isElementDisplayed(calendarExpanded)).toBe(true);
                expect(getText(currentDay, 0)).toBe(new Date().getDate().toString());
            }
        }
    });

    fit('Verify on click on the input field ', () => {
         const activeInputsLength = getElementArrayLength(activeDateTimePickerInput);
         for (let i = 0; i < activeInputsLength; i++) {
         sendKeys(['Escape']);
            scrollIntoView(activeDateTimePickerInput, i);
            setValue(activeDateTimePickerInput, text, i);
            expect(getValue(activeDateTimePickerInput, i)).toBe(text);
        }
    });

});


