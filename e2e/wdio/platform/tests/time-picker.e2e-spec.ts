import {
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getText,
    getValue,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { time, text, defaultValidTime } from '../fixtures/testData/time-picker';
import { TimePickerPO } from '../pages/time-picker.po';

describe('Time picker suite', function() {
    let timePickerPage: TimePickerPO;
    timePickerPage = new TimePickerPO();
    const {
        activeTimePickerInput, timePickerButton, timePickerInput, timerExpanded,
        activeTimePickerButton, errorBorder,
        selectedHours, selectedMinutes, period,
        navigationDownArrowButton, timeItem, setToNullButton, setValidTimeButton
    } = timePickerPage;

    beforeAll(() => {
        timePickerPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(timePickerInput);
    }, 1);

    it('Verify in all the form factor user is able to see the date picker button and input field ', () => {
        const buttonsCount = getElementArrayLength(timePickerButton);
        const inputsCount = getElementArrayLength(timePickerInput);
        expect(buttonsCount).toEqual(inputsCount);
        for (let i = 1; i < buttonsCount; i++) {
            waitForElDisplayed(timePickerButton, i);
            waitForElDisplayed(timePickerInput, i);
        }
    });

    it('Verify on click on the time picker button', () => {
        const activeButtonsCount = getElementArrayLength(activeTimePickerButton);
        for (let i = 1; i < activeButtonsCount; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeTimePickerButton, i);
            click(activeTimePickerButton, i);
            waitForElDisplayed(timerExpanded);
        }
    });

    it('Verify input field have placeholder', () => {
        const inputsCount = getElementArrayLength(activeTimePickerInput);
        for (let i = 0; i < inputsCount; i++) {
            expect(['', null]).not.toContain(getAttributeByName(activeTimePickerInput, 'placeholder', i));
        }
    });

    it('Verify on click on the input field ', () => {
        const activeInputsCount = getElementArrayLength(activeTimePickerInput);
        for (let i = 0; i < activeInputsCount; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeTimePickerInput, i);
            setValue(activeTimePickerInput, text, i);
            expect(getValue(activeTimePickerInput, i)).toBe(text);
            expect(doesItExist(timerExpanded)).toBe(false);
        }
    });

    it('Verify user is able to set time', () => {
        const activeButtonsLength = getElementArrayLength(activeTimePickerButton);
        for (let i = 0; i < activeButtonsLength; i++) {
            scrollIntoView(activeTimePickerButton, i);
            click(activeTimePickerButton, i);
            selectHoursAndMinutes(11);
            sendKeys(['Escape']);
            expect(getValue(activeTimePickerInput, i)).toBe(time);
        }
    });

    it('Verify null validity time picker', () => {
        scrollIntoView(activeTimePickerButton, 4);
        expect(doesItExist(errorBorder)).toBe(false);
        click(setToNullButton);
        expect(doesItExist(errorBorder)).toBe(true);
        click(setValidTimeButton);
        expect(doesItExist(errorBorder)).toBe(false);
        expect(getValue(activeTimePickerInput, 4)).toBe(defaultValidTime);
    });

    it('Verify LTR / RTL switcher', () => {
        timePickerPage.checkRtlSwitch();
    })

    fdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            timePickerPage.saveExampleBaselineScreenshot('time-picker');
            expect(timePickerPage.compareWithBaseline('time-picker')).toBeLessThan(1);
        });

        fit('should check examples visual regression', () => {
            scrollIntoView(activeTimePickerButton, 0);
            click(activeTimePickerButton, 0);
            timePickerPage.saveExampleBaselineScreenshot('time-picker-expanded', {}, timerExpanded);
            expect(timePickerPage.compareWithBaseline('time-picker-expanded')).toBeLessThan(1);
        });
    });

    function selectHoursAndMinutes(hour: number = 1, minute: number = 1): void {
        while (getText(selectedHours) !== hour.toString()) {
            click(navigationDownArrowButton);
        }
        click(timeItem, 1);
        while (getText(selectedMinutes) !== minute.toString()) {
            click(navigationDownArrowButton);
        }
        click(timeItem, 2);
        click(period);
    }
});

