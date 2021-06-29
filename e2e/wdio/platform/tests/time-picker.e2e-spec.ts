import {
    checkElementScreenshot,
    click,
    doesItExist,
    getElementArrayLength, getImageTagBrowserPlatform,
    getValue,
    refreshPage, saveElementScreenshot,
    scrollIntoView,
    sendKeys, isEnabled,
    setValue,
    waitForElDisplayed,
    waitForPresent, getElementPlaceholder
} from '../../driver/wdio';
import { time, text, defaultValidTime } from '../fixtures/testData/time-picker';
import { TimePickerPO } from '../pages/time-picker.po';
import {
    notValidInputFieldExample,
    notValidInputFieldState,
} from '../fixtures/testData/time-picker-tags';

describe('Time picker suite', function() {
    const timePickerPage = new TimePickerPO();
    const {
        activeTimePickerInput, timePickerInput, timerExpanded,
        activeTimePickerButton, errorBorder, selectedValue,
        disabledInput, disabledButton,
        navigationDownArrowButton, timeItem, setToNullButton, setValidTimeButton,
        invalidTimePickerInput,
    } = timePickerPage;

    beforeAll(() => {
        timePickerPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(timePickerInput);
    }, 1);

    it('Verify on click on the time picker button', () => {
        const activeButtonsCount = getElementArrayLength(activeTimePickerButton);
        for (let i = 1; i < activeButtonsCount; i++) {
            sendKeys(['Escape']);
            scrollIntoView(activeTimePickerButton, i);
            click(activeTimePickerButton, i);
            waitForElDisplayed(timerExpanded);
            click(activeTimePickerButton, i);
        }
    });

    it('Verify disabled inputs for time pickers', () => {
        const disabledInputsCount = getElementArrayLength(disabledInput);
        for (let i = 1; i < disabledInputsCount; i++) {
            scrollIntoView(disabledInput, i);
            expect(isEnabled(disabledInput, i)).toBe(false);
        }
    });

    it('Verify disabled buttons for time pickers', () => {
        const disabledButtonsCount = getElementArrayLength(disabledButton);
        for (let i = 1; i < disabledButtonsCount; i++) {
            scrollIntoView(disabledButton, i);
            expect(isEnabled(disabledButton, i)).toBe(false);
        }
    });

    it('Verify input field have placeholder', () => {
        const inputsCount = getElementArrayLength(activeTimePickerInput);
        for (let i = 0; i < inputsCount; i++) {
            expect(['', null]).not.toContain(getElementPlaceholder(activeTimePickerInput, i));
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

    // skipped due to infinity cycle on saucelabs
    xit('Verify user is able to set time', () => {
        const activeButtonsLength = getElementArrayLength(activeTimePickerButton);
        for (let i = 0; i < activeButtonsLength; i++) {
            if (i === 3 || i === 8 || i === 13) {
                continue;
            }
            scrollIntoView(activeTimePickerButton, i);
            click(activeTimePickerButton, i);
            selectHoursAndMinutes(11);
            sendKeys(['Escape']);
            expect(doesItExist(timerExpanded)).toBe(false);
            expect(getValue(activeTimePickerInput, i)).toBe(time);
        }
    });

    it('Verify null validity for basic time picker ', () => {
        scrollIntoView(activeTimePickerButton, 4);
        expect(doesItExist(errorBorder)).toBe(false);
        click(setToNullButton);
        expect(doesItExist(errorBorder)).toBe(true);
        click(setValidTimeButton);
        expect(doesItExist(errorBorder)).toBe(false);
        expect(getValue(activeTimePickerInput, 4)).toBe(defaultValidTime);
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/4853
    xit('Verify null validity for time picker with reactive form', () => {
        scrollIntoView(activeTimePickerButton, 9);
        expect(doesItExist(errorBorder)).toBe(false);
        click(setToNullButton, 1);
        expect(doesItExist(errorBorder)).toBe(true);
        click(setValidTimeButton, 1);
        expect(doesItExist(errorBorder)).toBe(false);
        expect(getValue(activeTimePickerInput, 9)).toBe(defaultValidTime);
    });

    it('Verify null validity for time picker with template form', () => {
        scrollIntoView(activeTimePickerButton, 14);
        expect(doesItExist(errorBorder)).toBe(false);
        click(setToNullButton, 2);
        expect(doesItExist(errorBorder)).toBe(true);
        click(setValidTimeButton, 2);
        expect(doesItExist(errorBorder)).toBe(false);
        expect(getValue(activeTimePickerInput, 14)).toBe(defaultValidTime);
    });

    it('Verify LTR / RTL switcher', () => {
        timePickerPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', function() {
        beforeEach(() => {
            refreshPage();
            waitForPresent(timePickerInput);
        }, 1);

        it('should check examples visual regression', () => {
            timePickerPage.saveExampleBaselineScreenshot();
            expect(timePickerPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('should check time picker visual regression', () => {
            scrollIntoView(activeTimePickerButton);
            click(activeTimePickerButton);
            waitForElDisplayed(timerExpanded);
            saveElementScreenshot(timerExpanded, `time-picker-expanded-example-platform-${getImageTagBrowserPlatform()}`, timePickerPage.getScreenshotFolder());
            expect(checkElementScreenshot(timerExpanded, `time-picker-expanded-example-platform-${getImageTagBrowserPlatform()}`, timePickerPage.getScreenshotFolder()))
                .toBeLessThan(5);
        });

        it('should check not valid input field for basic time picker', () => {
            scrollIntoView(setToNullButton);
            click(setToNullButton);
            expect(doesItExist(errorBorder)).toBe(true);
            scrollIntoView(invalidTimePickerInput);
            saveElementScreenshot(invalidTimePickerInput, notValidInputFieldExample + notValidInputFieldState + '-basic-time-picker', timePickerPage.getScreenshotFolder());
            expect(checkElementScreenshot(invalidTimePickerInput, notValidInputFieldExample + notValidInputFieldState + '-basic-time-picker', timePickerPage.getScreenshotFolder()))
                .toBeLessThan(5);
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/4853
        xit('should check not valid input field for time picker with reactive form', () => {
            scrollIntoView(setToNullButton);
            click(setToNullButton, 1);
            expect(doesItExist(errorBorder)).toBe(true);
            scrollIntoView(invalidTimePickerInput);
            saveElementScreenshot(invalidTimePickerInput, notValidInputFieldExample + notValidInputFieldState + '-with-reactive-form', timePickerPage.getScreenshotFolder());
            expect(checkElementScreenshot(invalidTimePickerInput, notValidInputFieldExample + notValidInputFieldState + '-with-reactive-form', timePickerPage.getScreenshotFolder()))
                .toBeLessThan(5);
        });

        it('should check not valid input field state for time picker with template form', () => {
            scrollIntoView(setToNullButton);
            click(setToNullButton, 2);
            expect(doesItExist(errorBorder)).toBe(true);
            scrollIntoView(invalidTimePickerInput);
            saveElementScreenshot(invalidTimePickerInput, notValidInputFieldExample + notValidInputFieldState + '-with-template-form', timePickerPage.getScreenshotFolder());
            expect(checkElementScreenshot(invalidTimePickerInput, notValidInputFieldExample + notValidInputFieldState + '-with-template-form', timePickerPage.getScreenshotFolder()))
                .toBeLessThan(5);
        });
    });

    function selectHoursAndMinutes(hour: number = 1, minute: number = 1, day_time: string = ' PM '): void {
        while ($(selectedValue).getText() !== ` ${hour.toString()} `) {
            click(navigationDownArrowButton);
        }
        click(timeItem, 1);
        while ($$(selectedValue)[1].getText() !== ` ${minute.toString()} `) {
            click(navigationDownArrowButton);
        }
        click(timeItem, 2);
        while ($$(selectedValue)[2].getText() !== day_time) {
            click(navigationDownArrowButton);
        }
    }
});
