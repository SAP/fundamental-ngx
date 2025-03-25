import {
    browserIsSafari,
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementPlaceholder,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { currentDay, date, fruitArr, placeholder, testText } from './toolbar-contents';
import { ToolbarPo } from './toolbar.po';

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
        overflowInput
    } = toolbarPage;

    beforeAll(async () => {
        await toolbarPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await toolbarPage.waitForRoot();
        await waitForElDisplayed(toolbarPage.title);
    }, 2);

    it('verify info active toolbar is clickable', async () => {
        await scrollIntoView(activeInfoToolbar);
        await expect(await isElementClickable(activeInfoToolbar)).toBe(true, 'info active toolbar is not clickable');
    });

    describe('Check Toolbar Overflow example', () => {
        it('verify all buttons are clickable', async () => {
            await checkClickableButton(overflowButton);
        });

        it('verify dropdown menu', async () => {
            await scrollIntoView(dropdownMenu);
            await click(dropdownMenu);
            const optionLength = await getElementArrayLength(dropdownOption);
            for (let i = 0; i < optionLength; i++) {
                await click(dropdownOption, i);
                await expect((await getText(inputFieldText)).trim()).toBe(fruitArr[i]);
                if (i !== 3) {
                    await click(dropdownMenu);
                }
            }
        });

        it('verify date time picker example', async () => {
            if (await browserIsSafari()) {
                // not working correctly
                return;
            }
            await scrollIntoView(dateTimeButton);
            await click(dateTimeButton);
            await clickDayInCalendarButtonByValue(currentDay);
            await selectHoursMinutesAndPeriod();
            await click(okButton);
            await expect(await getValue(dateTimeInput)).toEqual(date);
        });

        it('verify popover input has placeholder', async () => {
            await scrollIntoView(toolbarOverflowExample + moreButton);
            if ((await getElementArrayLength(overflowInput)) === 2) {
                await expect(await getElementPlaceholder(overflowInput, 1)).toBe(placeholder);
            }
            if ((await getElementArrayLength(overflowInput)) === 1) {
                await click(toolbarOverflowExample + moreButton);
                await waitForPresent(popoverInput);
                await expect(await getElementPlaceholder(popoverInput)).toBe(placeholder);
            }
        });

        it('verify that possible enter value popover input', async () => {
            await scrollIntoView(toolbarOverflowExample + moreButton);
            if ((await getElementArrayLength(overflowInput)) === 2) {
                await setValue(overflowInput, testText, 1);
                await expect(await getValue(overflowInput, 1)).toBe(testText);
            }
            if ((await getElementArrayLength(overflowInput)) === 1) {
                await click(toolbarOverflowExample + moreButton);
                await waitForPresent(popoverInput);
                await setValue(popoverInput, testText);
                await expect(await getValue(popoverInput)).toBe(testText);
            }
        });

        it('verify popover buttons are clickable', async () => {
            await scrollIntoView(toolbarOverflowExample + moreButton);
            await click(toolbarOverflowExample + moreButton);
            await checkClickableButton(popoverButton);
        });

        it('verify popover toggle buttons are work correctly', async () => {
            await scrollIntoView(toolbarOverflowExample + moreButton);
            await click(toolbarOverflowExample + moreButton);
            const toggleButtonLength = await getElementArrayLength(popoverToggledButton);
            for (let i = 0; i < toggleButtonLength; i++) {
                await click(popoverToggledButton, i);
                await expect(await getAttributeByName(popoverToggledButton, 'aria-pressed', i)).toBe('true');
            }
        });
    });

    describe('Check Toolbar Overflow Priority', () => {
        it('should check Toolbar Overflow Priority example', async () => {
            await checkClickableButton(overflowPriorityButton);
            await click(overflowPriorityExample + moreButton);
            await expect(await isElementDisplayed(overflowBody)).toBe(true, 'overflow body id not displayed');
            await expect(await isElementClickable(alwaysButton)).toBe(true, 'button is not clickable');
        });
    });

    describe('Check Toolbar Overflow Grouping', () => {
        it('should check Toolbar Overflow Grouping example', async () => {
            await checkClickableButton(overflowGroupingButton);
            await click(overflowGroupingExample + moreButton);
            await expect(await isElementDisplayed(overflowBody)).toBe(true, 'overflow body id not displayed');
            await expect(await isElementClickable(alwaysButton)).toBe(true, 'button is not clickable');
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await toolbarPage.checkRtlSwitch();
        });
    });

    async function selectHoursMinutesAndPeriod(hour: number = 11, minute: number = 1): Promise<void> {
        while ((await getText(selectedHours)) !== hour.toString()) {
            await click(navigationUpArrowButton);
        }
        await click(timeColumn, 1);
        while ((await getText(selectedMinutes)) !== minute.toString()) {
            await click(navigationDownArrowButton);
        }
        await click(timeColumn, 2);
        await click(period);
    }
});

async function checkClickableButton(selector: string): Promise<void> {
    const count = await getElementArrayLength(selector);
    for (let i = 0; i < count; i++) {
        await scrollIntoView(selector, i);
        await expect(await isElementClickable(selector)).toBe(true, `button with index ${i} not clickable`);
    }
}
