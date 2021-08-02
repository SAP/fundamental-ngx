import {
    click,
    clickNextElement,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getNextElementText,
    getText,
    getValue, isElementClickable,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForPresent,
} from '../../driver/wdio';
import { DatePickerPo } from '../pages/date-picker.po';
import { currentYear, invalidDate, getCurrentItemIndex, getCurrentMonth, getNextDay } from '../fixtures/testData/date-picker-tags'
import { blockExamples } from '../fixtures/appData/date-picker-contents';

describe('Datetime picker suite', function () {
    const datePickerPage = new DatePickerPo();
    const {
        defaultExample, formExample, rangeExample, disabledExample, allowNullExample, formRangeExample,
        formattingExample, disableFuncExample, internationalExample, rangeDisabledExample, calendar, calendarIcon,
        calendarInput, calendarItem, selectedTimeLine, currentItem, itemText, inputGroup, frenchButton, germanButton,
        bulgarianButton, previousMonthButton, nextMonthButton, calendarBody, calendarRow, selectMonthButton,
        selectYearButton, months, buttonText, message
    } = new DatePickerPo();

    beforeAll(() => {
        datePickerPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(datePickerPage.title);
    }, 1);

    it('should check calendar open close', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== disabledExample) {
                checkOpenClose(blockExamples[i]);
            }
        }
    });

    it('should check choosing date', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== internationalExample && blockExamples[i] !== disabledExample && blockExamples[i] !== formRangeExample) {
                checkChoosingDate(blockExamples[i]);
                refreshPage();
            }
        }
    });

    it('should check choosing 2 dates', () => {
        checkRageExample(formattingExample, 1);
        checkRageExample(formRangeExample);
        checkRageExample(rangeExample);
    });

    it('should check disabled example', () => {
        expect(isElementClickable(disabledExample + inputGroup)).toBe(false, `input group is not disabled`);
    });

    it('should check disabled calendar group in reactive form example', () => {
        expect(isElementClickable(formExample + inputGroup, 1)).toBe(false, `input group is not disabled`);
    });

    it('should check localization example', () => {
        click(bulgarianButton);
        expect(getElementClass(bulgarianButton)).toContain('is-selected', `language is not selected`);
        click(germanButton);
        expect(getElementClass(germanButton)).toContain('is-selected', `language is not selected`);
        click(frenchButton);
        expect(getElementClass(frenchButton)).toContain('is-selected', `language is not selected`);
    });

    it('should check typing invalid date in the input', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== disabledExample && blockExamples[i] !== internationalExample && blockExamples[i] !== formExample &&
                blockExamples[i] !== disableFuncExample) {
                checkTypingInvalidDate(blockExamples[i]);
            }
        }
    })

    it('should check that previous days are disabled in disabled func example', () => {
        click(disableFuncExample + calendarIcon);

        const currentDayIndex = getCurrentItemIndex();
        const itemsLength = getElementArrayLength(calendarItem) - 1;

        for (let i = currentDayIndex - 1; i !== 0; i--) {
            expect(isElementClickable(calendarItem, i)).toBe(false, `previous element is not disabled`);
        }

        for (let i = currentDayIndex; i < itemsLength; i++) {
            expect(isElementClickable(calendarItem, i)).toBe(true, `element is disabled`);
        }

    })

    it('should check that available only 2 next weeks in range disabled example', () => {
        click(rangeDisabledExample + calendarIcon);
        const currentDayIndex = getCurrentItemIndex();
        const itemsLength = getElementArrayLength(calendarItem) - 1;

        for (let i = currentDayIndex - 1; i != 0; i--) {
            expect(isElementClickable(calendarItem, i)).toBe(false, `element is not disabled`);
        }
        if (currentDayIndex + 15 <= itemsLength) {
            for (let i = currentDayIndex; i < currentDayIndex + 15; i++) {
                expect(isElementClickable(calendarItem, i)).toBe(true, `element is disabled`);
            }

            for (let i = currentDayIndex + 15; i < itemsLength; i++) {
                expect(isElementClickable(calendarItem, i)).toBe(false, `element is not disabled`);
            }
        }

        if (currentDayIndex + 15 > itemsLength) {
            const lengthDifference = itemsLength - currentDayIndex;
            const availableLengthNextMonth = 15 - lengthDifference;

            for (let i = 0; i < lengthDifference; i++) {
                expect(isElementClickable(calendarItem, i)).toBe(true, `element is disabled`);
            }

            click(nextMonthButton);

            for (let i = 0; i < availableLengthNextMonth; i++) {
                expect(isElementClickable(calendarItem, i)).toBe(true, `element is disabled`);
            }

            for (let i = availableLengthNextMonth + 1; i < itemsLength; i++) {
                expect(isElementClickable(calendarItem, i)).toBe(false, `element is not disabled`);
            }
        }

    });

    it('should check marking of weekends', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== disabledExample) {
                checkWeekendsMarking(blockExamples[i]);
            }
        }
    });

    it('should check choosing month', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== internationalExample && blockExamples[i] !== disabledExample) {
                checkChoosingMonth(blockExamples[i]);
            }
        }
    });

    it('should check choosing year', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== internationalExample && blockExamples[i] !== disabledExample) {
                checkChoosingYear(blockExamples[i]);
            }
        }
    });

    it('should check changing month by left - right arrows', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== internationalExample && blockExamples[i] !== disabledExample) {
                checkChangingMonthByArrows(blockExamples[i]);
            }
        }
    });

    it('should check states of input groups', () => {
        expect(getElementClass(allowNullExample + inputGroup)).toContain('is-success');
        expect(getElementClass(formExample + inputGroup, 1)).toContain('is-information');
        expect(getElementClass(disableFuncExample + inputGroup)).toContain('is-success');
        expect(getElementClass(rangeDisabledExample + inputGroup)).toContain('is-success');
    });

    it('should check compact calendar', () => {
        expect(getElementClass(defaultExample + calendarInput, 1)).toContain('compact', `the input is not compact`);
        expect(getElementClass(defaultExample + calendarIcon, 1)).toContain('compact', `the icon is not compact`);
        click(defaultExample + calendarIcon, 1);
        expect(getElementClass(calendar)).toContain('compact', `calendar is not compact`);
    });

    it('should check hovering on the input group', () => {
        checkHoverOnInputGroup(disableFuncExample, 'success');
        checkHoverOnInputGroup(formExample, 'success');
        checkHoverOnInputGroup(formExample, 'information', 1);
    });

    it('should check RTL and LTR orientation', () => {
        datePickerPage.checkRtlSwitch();
    });

    function checkHoverOnInputGroup(section: string, messageType: string, index: number = 0): void {
        scrollIntoView(section);
        mouseHoverElement(section + inputGroup, index);
        expect(isElementDisplayed(message + messageType)).toBe(true, `message did not displayed`);
    }

    function checkChangingMonthByArrows(section: string): void {
        click(section + calendarIcon);
        click(selectMonthButton);

        const previousMonthName = getAttributeByName(calendarItem + itemText, 'aria-label', getCurrentItemIndex() - 1);
        const nextMonthName = getAttributeByName(calendarItem + itemText, 'aria-label', getCurrentItemIndex() + 1);
        click(selectMonthButton);

        click(nextMonthButton);
        expect(getText(selectMonthButton + buttonText)).toEqual(nextMonthName, `next month is not chosen`);

        click(previousMonthButton);
        click(previousMonthButton);
        expect(getText(selectMonthButton + buttonText)).toEqual(previousMonthName, `previous month is not chosen`);
        click(section + calendarIcon);
    }

    function checkChoosingYear(section: string): void {
        click(section + calendarIcon);
        click(selectYearButton);
        const nextYear = getNextElementText(currentItem);
        clickNextElement(currentItem);
        expect(getText(selectYearButton + buttonText)).toEqual(nextYear);
        click(section + calendarIcon);
    }

    function checkChoosingMonth(section: string): void {
        click(section + calendarIcon);
        click(selectMonthButton);
        expect(isElementDisplayed(months)).toBe(true);
        const firstMonth = getAttributeByName(calendarItem + itemText, 'aria-label');
        click(calendarItem);
        expect(getText(selectMonthButton + buttonText)).toEqual(firstMonth, `month is not chosen`);
        click(section + calendarIcon);
    }

    function checkWeekendsMarking(section: string): void {
        scrollIntoView(section);
        section !== internationalExample ? click(section + calendarIcon) : click(section + calendarIcon, 3);
        for (let i = 0; i < 5; i++) {
            if (!getElementClass(calendarBody + calendarRow + `:nth-child(${i + 1}) ` + calendarItem, 0).includes('other-month') &&
                !getElementClass(calendarBody + calendarRow + `:nth-child(${i + 1}) ` + calendarItem, 6).includes('other-month')) {
                expect(getElementClass(calendarBody + calendarRow + `:nth-child(${i + 1}) ` + calendarItem, 0)).toContain('-weekend', 'the day is not weekend');
                expect(getElementClass(calendarBody + calendarRow + `:nth-child(${i + 1}) ` + calendarItem, 6)).toContain('-weekend', 'the day is not weekend');
            }
        }
        section !== internationalExample ? click(section + calendarIcon) : click(section + calendarIcon, 3);
    }

    function checkRageExample(section: string, calendarIndex: number = 0): void {
        click(section + calendarIcon, calendarIndex);
        const itemsLength = getElementArrayLength(calendarItem) - 1;
        let firstDayIndex, lastDayIndex;
        let firstChosenDayText, secChosenDayText;

        for (let i = 0; i < itemsLength; i++) {
            if (!getElementClass(calendarItem, i).includes('other-month')) {
                firstDayIndex = i;
                break;
            }
        }
        firstChosenDayText = '0' + getText(calendarItem, firstDayIndex);

        for (let i = itemsLength; i !== 0; i--) {
            if (!getElementClass(calendarItem, i).includes('other-month') && !getElementClass(calendarItem, i).includes('hidden-day')) {
                lastDayIndex = i;
                break;
            }
        }

        secChosenDayText = getText(calendarItem, lastDayIndex);

        click(calendarItem, firstDayIndex);
        click(calendarItem, lastDayIndex);

        expect(getElementClass(calendarItem, firstDayIndex)).toContain('is-active', `first day is not chosen`);
        expect(getElementClass(calendarItem, lastDayIndex)).toContain('is-active', `last day is not chosen`);

        for (let i = 0; i < itemsLength - 1; i++) {
            if (getElementClass(calendarItem, i).includes('side-helper') || getElementClass(calendarItem, i).includes('other-month')
                || getElementClass(calendarItem, i).includes('is-active')) {
                continue;
            }
            expect(getElementClass(calendarItem, i)).toContain('--range', `range is not defined`);
        }

        if (section === formattingExample) {
            expect(getText(formattingExample + selectedTimeLine, 1)).toContain(`${getCurrentMonth(true)}/${firstChosenDayText}/${currentYear.toString().slice(2)}`);
            expect(getText(formattingExample + selectedTimeLine, 2)).toContain(`${getCurrentMonth(true)}/${secChosenDayText}/${currentYear.toString().slice(2)}`);
        }
        click(section + calendarIcon, calendarIndex);
    }

    function checkTypingInvalidDate(section: string): void {
        click(section + calendarIcon);
        setValue(section + calendarInput, invalidDate);
        expect(getText(section + selectedTimeLine)).toContain('Invalid Date', `error message is not appeared`);
    }

    function checkChoosingDate(section: string): void {
        let chosenDate;
        scrollIntoView(section + calendarIcon);
        click(section + calendarIcon);
        clickNextElement(currentItem);
        section === formattingExample ? chosenDate = `${getCurrentMonth(true)}/${getNextDay(true)}/${currentYear.toString().slice(2)}` : chosenDate = `${getCurrentMonth(false)}/${getNextDay(false)}/${currentYear}`;

        expect(getValue(section + calendarInput)).toContain(chosenDate, `input does not contain chosen value for ${section}`);
        click(section + calendarIcon);
    }

    function checkOpenClose(section: string): void {
        section === internationalExample ? click(section + calendarIcon, 3) : click(section + calendarIcon);
        expect(isElementDisplayed(calendar)).toBe(true, `calendar is not opened in ${section} example`);
        section === internationalExample ? click(section + calendarIcon, 3) : click(section + calendarIcon);
        expect(doesItExist(calendar)).toBe(false, `calendar is not closed in ${section} example`);
    }

});
