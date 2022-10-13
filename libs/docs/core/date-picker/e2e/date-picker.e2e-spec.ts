import {
    browserIsSafari,
    click,
    clickNextElement,
    doesItExist,
    focusElement,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { DatePickerPo } from './date-picker.po';
import { currentYear, getCurrentItemIndex, getCurrentMonth, getNextDay, invalidDate } from './date-picker-tags';
import { blockExamples } from './date-picker-contents';

// https://github.com/SAP/fundamental-ngx/issues/8837
xdescribe('Date picker suite', () => {
    const datePickerPage = new DatePickerPo();
    const {
        defaultExample,
        formExample,
        rangeExample,
        disabledExample,
        allowNullExample,
        formRangeExample,
        formattingExample,
        disableFuncExample,
        internationalExample,
        rangeDisabledExample,
        calendar,
        calendarIcon,
        calendarInput,
        calendarItem,
        selectedTimeLine,
        currentItem,
        inputGroup,
        inputGroupInputElement,
        frenchButton,
        germanButton,
        bulgarianButton,
        nextMonthButton,
        calendarBody,
        calendarRow,
        selectMonthButton,
        selectYearButton,
        months,
        message,
        currentMonthCalendarItem,
        getCurrentDayIndex,
        altCalendarItem,
        monthAttributeLabel
    } = new DatePickerPo();

    beforeAll(async () => {
        await datePickerPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(datePickerPage.root);
        await waitForElDisplayed(datePickerPage.title);
    }, 1);

    if (browserIsSafari()) {
        // skip safari; runner gets stuck sometimes; flaky
        return;
    }

    it('should check calendar open close', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== disabledExample) {
                await checkOpenClose(blockExamples[i]);
            }
        }
    });

    /** TODO: Rewrite flaky tests & https://github.com/SAP/fundamental-ngx/issues/7505 */
    xit('should check choosing date', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (
                // skip internationalExample disabledExample rangeDisabledExample formRangeExample, disabledDatePicker
                i !== 2 &&
                i !== 6 &&
                i !== 7 &&
                i !== 8 &&
                i !== 10
            ) {
                await checkChoosingDate(blockExamples[i]);
                await refreshPage();
                await waitForPresent(datePickerPage.root);
                await waitForElDisplayed(datePickerPage.title);
            }
        }
    });

    it('should check choosing 2 dates', async () => {
        await checkRageExample(formattingExample, 1);
        await checkRageExample(formRangeExample);
        await checkRageExample(rangeExample);
    });

    it('should check disabled example', async () => {
        await expect(await isElementClickable(disabledExample + inputGroup)).toBe(false, `input group is not disabled`);
    });

    it('should check disabled calendar group in reactive form example', async () => {
        await expect(await isElementClickable(formExample + inputGroup, 1)).toBe(false, `input group is not disabled`);
    });

    it('should check localization example', async () => {
        await click(bulgarianButton);
        await expect(await getElementClass(bulgarianButton)).toContain('is-selected', `language is not selected`);
        await click(germanButton);
        await expect(await getElementClass(germanButton)).toContain('is-selected', `language is not selected`);
        await click(frenchButton);
        await expect(await getElementClass(frenchButton)).toContain('is-selected', `language is not selected`);
    });

    it('should check typing invalid date in the input', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (
                blockExamples[i] !== disabledExample &&
                blockExamples[i] !== internationalExample &&
                blockExamples[i] !== formExample &&
                blockExamples[i] !== disableFuncExample
            ) {
                await checkTypingInvalidDate(blockExamples[i]);
            }
        }
    });

    it('should check that previous days are disabled in disabled func example', async () => {
        await click(disableFuncExample + calendarIcon);

        const currentDayIndex = await getCurrentItemIndex();
        const itemsLength = (await getElementArrayLength(calendarItem)) - 1;

        for (let i = currentDayIndex - 1; i !== 0; i--) {
            await expect(await isElementClickable(calendarItem, i)).toBe(false, `previous element is not disabled`);
        }

        for (let i = currentDayIndex; i < itemsLength; i++) {
            await expect(await isElementClickable(calendarItem, i)).toBe(true, `element is disabled`);
        }
    });

    it('should check that available only 2 next weeks in range disabled example', async () => {
        await click(rangeDisabledExample + calendarIcon);
        const currentDayIndex = await getCurrentItemIndex();
        const itemsLength = await getElementArrayLength(altCalendarItem);

        for (let i = currentDayIndex - 1; i !== 0; i--) {
            await expect(await isElementClickable(calendarItem, i)).toBe(false, `previous day not disabled`);
        }

        if (currentDayIndex + 15 <= itemsLength) {
            for (let i = currentDayIndex; i < currentDayIndex + 15; i++) {
                await expect(await isElementClickable(calendarItem, i)).toBe(true, `element is not disabled`);
            }

            for (let i = currentDayIndex + 15; i < itemsLength; i++) {
                await expect(await isElementClickable(calendarItem, i)).toBe(false, `element is disabled`);
            }
        }

        if (currentDayIndex + 14 > itemsLength) {
            const lengthDifference = itemsLength - currentDayIndex;
            const availableLengthNextMonth = 14 - lengthDifference;

            for (let i = currentDayIndex; i < lengthDifference; i++) {
                await expect(await isElementClickable(currentMonthCalendarItem, i)).toBe(
                    true,
                    `element ${i} is disabled`
                );
            }

            await click(nextMonthButton);

            for (let i = 0; i < availableLengthNextMonth; i++) {
                await expect(await isElementClickable(currentMonthCalendarItem, i)).toBe(
                    true,
                    `element ${i} is disabled`
                );
            }

            for (let i = availableLengthNextMonth + 2; i < itemsLength; i++) {
                if (i >= 31) {
                    break;
                }
                await expect(await isElementClickable(currentMonthCalendarItem, i)).toBe(
                    false,
                    `element ${i} is not disabled`
                );
            }
        }
    });

    it('should check marking of weekends', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== disabledExample) {
                await checkWeekendsMarking(blockExamples[i]);
            }
        }
    });

    it('should check choosing month', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== internationalExample && blockExamples[i] !== disabledExample) {
                await checkChoosingMonth(blockExamples[i]);
            }
        }
    });

    it('should check choosing year', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== internationalExample && blockExamples[i] !== disabledExample) {
                await checkChoosingYear(blockExamples[i]);
            }
        }
    });

    it('should check changing month by left - right arrows', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            if (blockExamples[i] !== internationalExample && blockExamples[i] !== disabledExample) {
                await checkChangingMonthByArrows(blockExamples[i]);
            }
        }
    });

    it('should check states of input groups', async () => {
        await expect(await getElementClass(allowNullExample + inputGroup)).not.toContain('is-error');
        await expect(await getElementClass(formExample + inputGroup, 1)).toContain('is-information');
        await expect(await getElementClass(disableFuncExample + inputGroup)).toContain('is-success');
        await expect(await getElementClass(rangeDisabledExample + inputGroup)).toContain('is-success');
    });

    it('should check compact calendar', async () => {
        await expect(await getElementClass(defaultExample + calendarInput, 1)).toContain(
            'compact',
            `the input is not compact`
        );
        await expect(await getElementClass(defaultExample + calendarIcon, 1)).toContain(
            'compact',
            `the icon is not compact`
        );
        await click(defaultExample + calendarIcon, 1);
        await expect(await getElementClass(calendar)).toContain('compact', `calendar is not compact`);
    });

    it('should check message when input group in focus state', async () => {
        if (await browserIsSafari()) {
            return;
        }
        await focusElement(disableFuncExample + inputGroupInputElement);
        await expect(await isElementDisplayed(message + 'success')).toBeTruthy();

        await focusElement(formExample + inputGroupInputElement);
        await expect(await isElementDisplayed(message + 'success')).toBeTruthy();

        // // disabled input can not be focused so no message
        await focusElement(formExample + inputGroupInputElement, 1);
        await expect(await doesItExist(message)).toBeFalsy();
    });

    it('should check RTL and LTR orientation', async () => {
        await datePickerPage.checkRtlSwitch();
    });

    async function checkChangingMonthByArrows(section: string): Promise<void> {
        await click(section + calendarIcon);
        await click(selectMonthButton);
        let previousMonthName = '',
            nextMonthName = '';
        // if current month is January - we do not have previous month in this year
        if ((await getCurrentItemIndex()) !== 0) {
            previousMonthName = await getAttributeByName(
                calendarItem,
                monthAttributeLabel,
                (await getCurrentItemIndex()) - 1
            );

            await sendKeys(['ArrowLeft', 'Enter']);
            await expect(await getAttributeByName(selectMonthButton, monthAttributeLabel)).toEqual(
                previousMonthName,
                `previous month is not chosen, ${section}`
            );
        }
        await refreshPage();
        await click(section + calendarIcon);
        await click(selectMonthButton);
        // if current month is December - we do not have next month in this year
        if ((await getCurrentItemIndex()) !== 11) {
            nextMonthName = await getAttributeByName(
                calendarItem,
                monthAttributeLabel,
                (await getCurrentItemIndex()) + 1
            );

            await sendKeys(['ArrowRight', 'Enter']);
            await pause(3000);
            await expect(await getAttributeByName(selectMonthButton, monthAttributeLabel)).toEqual(
                nextMonthName,
                `next month is not chosen, ${section}`
            );
        }
        await click(section + calendarIcon);
    }

    async function checkChoosingYear(section: string): Promise<void> {
        await click(section + calendarIcon);
        await click(selectYearButton);
        const nextYear = await getAttributeByName(
            calendarItem,
            'data-fd-calendar-year',
            (await getCurrentDayIndex()) + 1
        );
        await clickNextElement(currentItem);
        await expect(await getText(selectYearButton)).toEqual(nextYear);
        await click(section + calendarIcon);
    }

    async function checkChoosingMonth(section: string): Promise<void> {
        await click(section + calendarIcon);
        await click(selectMonthButton);
        await expect(await isElementDisplayed(months)).toBe(true);
        const firstMonth = await getAttributeByName(calendarItem, monthAttributeLabel);
        await click(calendarItem);
        await expect(await getAttributeByName(selectMonthButton, monthAttributeLabel)).toEqual(
            firstMonth,
            `month is not chosen`
        );
        await click(section + calendarIcon);
    }

    async function checkWeekendsMarking(section: string): Promise<void> {
        await scrollIntoView(section);
        section !== internationalExample ? await click(section + calendarIcon) : await click(section + calendarIcon, 3);
        for (let i = 0; i < 5; i++) {
            if (
                !(
                    await getElementClass(calendarBody + calendarRow + `:nth-child(${i + 1}) ` + calendarItem, 0)
                ).includes('other-month') &&
                !(
                    await getElementClass(calendarBody + calendarRow + `:nth-child(${i + 1}) ` + calendarItem, 6)
                ).includes('other-month')
            ) {
                await expect(
                    await getElementClass(calendarBody + calendarRow + `:nth-child(${i + 1}) ` + calendarItem, 0)
                ).toContain('-weekend', 'the day is not weekend');
                await expect(
                    await getElementClass(calendarBody + calendarRow + `:nth-child(${i + 1}) ` + calendarItem, 6)
                ).toContain('-weekend', 'the day is not weekend');
            }
        }
        section !== internationalExample ? await click(section + calendarIcon) : await click(section + calendarIcon, 3);
    }

    async function checkRageExample(section: string, calendarIndex: number = 0): Promise<void> {
        await click(section + calendarIcon, calendarIndex);
        const itemsLength = (await getElementArrayLength(calendarItem)) - 1;
        let firstDayIndex, lastDayIndex;

        for (let i = 0; i < itemsLength; i++) {
            if (!(await getElementClass(calendarItem, i)).includes('other-month')) {
                firstDayIndex = i;
                break;
            }
        }

        const firstChosenDayText = '0' + (await getText(calendarItem + ' .fd-calendar__text', firstDayIndex));

        for (let i = itemsLength; i !== 0; i--) {
            if (
                !(await getElementClass(calendarItem, i)).includes('other-month') &&
                !(await getElementClass(calendarItem, i)).includes('hidden-day')
            ) {
                lastDayIndex = i;
                break;
            }
        }

        const secChosenDayText = await getText(calendarItem + ' .fd-calendar__text', lastDayIndex);

        await click(calendarItem, firstDayIndex);
        await click(calendarItem, lastDayIndex);

        await expect(await getElementClass(calendarItem, firstDayIndex)).toContain(
            'is-active',
            `first day is not chosen`
        );
        await expect(await getElementClass(calendarItem, lastDayIndex)).toContain(
            'is-active',
            `last day is not chosen`
        );

        for (let i = 0; i < itemsLength - 1; i++) {
            if (
                (await getElementClass(calendarItem, i)).includes('side-helper') ||
                (await getElementClass(calendarItem, i)).includes('other-month') ||
                (await getElementClass(calendarItem, i)).includes('is-active')
            ) {
                continue;
            }
            await expect(await getElementClass(calendarItem, i)).toContain('--range', `range is not defined`);
        }

        if (section === formattingExample) {
            await expect(await getText(formattingExample + selectedTimeLine, 1)).toContain(
                `${await getCurrentMonth(true)}/${firstChosenDayText}/${currentYear.toString().slice(2)}`
            );
            await expect(await getText(formattingExample + selectedTimeLine, 2)).toContain(
                `${await getCurrentMonth(true)}/${secChosenDayText}/${currentYear.toString().slice(2)}`
            );
        }
        await click(section + calendarIcon, calendarIndex);
    }

    async function checkTypingInvalidDate(section: string): Promise<void> {
        await click(section + calendarIcon);
        await setValue(section + calendarInput, invalidDate);
        await expect(await getText(section + selectedTimeLine)).toContain(
            'Invalid Date',
            `error message is not appeared`
        );
    }

    async function checkChoosingDate(section: string): Promise<void> {
        let chosenDate;
        await scrollIntoView(section + calendarIcon);
        await click(section + calendarIcon);
        const currentDayIndex = await getCurrentDayIndex();
        const dayCount = (await getElementArrayLength(currentMonthCalendarItem)) - 1;

        if (currentDayIndex === dayCount - 1) {
            await click(altCalendarItem, currentDayIndex - 1);
            await click(section + calendarIcon);
        }
        if (currentDayIndex !== dayCount - 1) {
            await click(altCalendarItem + ':not(.fd-calendar__item--other-month)', currentDayIndex + 1);

            section === formattingExample
                ? (chosenDate = `${await getCurrentMonth(true)}/${await getNextDay(true)}/${currentYear
                      .toString()
                      .slice(2)}`)
                : (chosenDate = `${await getCurrentMonth(false)}/${await getNextDay(false)}/${currentYear}`);

            await expect(await getValue(section + calendarInput)).toContain(
                chosenDate,
                `input does not contain chosen value for ${section}`
            );
            await click(section + calendarIcon);
        }
    }

    async function checkOpenClose(section: string): Promise<void> {
        section === internationalExample ? await click(section + calendarIcon, 3) : await click(section + calendarIcon);
        await expect(await isElementDisplayed(calendar)).toBe(true, `calendar is not opened in ${section} example`);
        section === internationalExample ? await click(section + calendarIcon, 3) : await click(section + calendarIcon);
        await expect(await doesItExist(calendar)).toBe(false, `calendar is not closed in ${section} example`);
    }
});
