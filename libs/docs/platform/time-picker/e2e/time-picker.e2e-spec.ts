import {
    click,
    doesItExist,
    getElementArrayLength,
    getElementPlaceholder,
    getText,
    getValue,
    isEnabled,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { altValidTime, defaultValidTime, text } from './time-picker';
import { TimePickerPO } from './time-picker.po';

describe('Time picker suite', () => {
    const timePickerPage = new TimePickerPO();
    const {
        activeTimePickerInput,
        timerExpanded,
        activeTimePickerButton,
        errorBorder,
        disabledInput,
        disabledButton,
        navigationDownArrowButton,
        setToNullButton,
        setValidTimeButton,
        hoursColumn,
        columnItem,
        thirdColumn,
        selectedTimeItem
    } = timePickerPage;

    beforeAll(async () => {
        await timePickerPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await timePickerPage.waitForRoot();
        await waitForElDisplayed(timePickerPage.title);
    }, 1);

    it('Verify on click on the time picker button', async () => {
        const activeButtonsCount = await getElementArrayLength(activeTimePickerButton);
        for (let i = 1; i < activeButtonsCount; i++) {
            if (i === 3 || i === 11 || i === 17) {
                continue;
            }
            await sendKeys(['Escape']);
            await scrollIntoView(activeTimePickerButton, i);
            await click(activeTimePickerButton, i);
            await waitForElDisplayed(timerExpanded);
            await click(activeTimePickerButton, i);
        }
    });

    it('Verify disabled inputs for time pickers', async () => {
        const disabledInputsCount = await getElementArrayLength(disabledInput);
        for (let i = 1; i < disabledInputsCount; i++) {
            await scrollIntoView(disabledInput, i);
            await expect(await isEnabled(disabledInput, i)).toBe(false);
        }
    });

    it('Verify disabled buttons for time pickers', async () => {
        const disabledButtonsCount = await getElementArrayLength(disabledButton);
        for (let i = 1; i < disabledButtonsCount; i++) {
            await scrollIntoView(disabledButton, i);
            await expect(await isEnabled(disabledButton, i)).toBe(false);
        }
    });

    it('Verify input field have placeholder', async () => {
        const inputsCount = await getElementArrayLength(activeTimePickerInput);
        for (let i = 0; i < inputsCount; i++) {
            await expect(['', null]).not.toContain(await getElementPlaceholder(activeTimePickerInput, i));
        }
    });

    it('Verify on click on the input field ', async () => {
        const activeInputsCount = await getElementArrayLength(activeTimePickerInput);
        for (let i = 0; i < activeInputsCount; i++) {
            if (i === 3 || i === 11 || i === 17) {
                continue;
            }
            await sendKeys(['Escape']);
            await scrollIntoView(activeTimePickerInput, i);
            await setValue(activeTimePickerInput, text, i);
            await expect(await getValue(activeTimePickerInput, i)).toBe(text);
            await expect(await doesItExist(timerExpanded)).toBe(false);
        }
    });

    it('Verify null validity for basic time picker ', async () => {
        await scrollIntoView(activeTimePickerButton, 5);
        await expect(await doesItExist(errorBorder)).toBe(false);
        await click(setToNullButton);
        await expect(await doesItExist(errorBorder)).toBe(true);
        await click(setValidTimeButton);
        await expect(await doesItExist(errorBorder)).toBe(false);
        await expect(await getValue(activeTimePickerInput, 5)).toBe(defaultValidTime);
    });

    it('Verify null validity for time picker with reactive form', async () => {
        await scrollIntoView(activeTimePickerButton, 10);
        await expect(await doesItExist(errorBorder)).toBe(false);
        await click(setToNullButton, 1);
        await expect(await doesItExist(errorBorder)).toBe(true);
        await click(setValidTimeButton, 1);
        await expect(await doesItExist(errorBorder)).toBe(false);
        await expect(await getValue(activeTimePickerInput, 10)).toBe(altValidTime);
    });

    it('Verify null validity for time picker with template form', async () => {
        await scrollIntoView(activeTimePickerButton, 16);
        await expect(await doesItExist(errorBorder)).toBe(false);
        await click(setToNullButton, 2);
        await expect(await doesItExist(errorBorder)).toBe(true);
        await click(setValidTimeButton, 2);
        await expect(await doesItExist(errorBorder)).toBe(false);
        await expect(await getValue(activeTimePickerInput, 16)).toBe(defaultValidTime);
    });

    it('should check that basic time picker has 24 hours format', async () => {
        await checkTimeFormat('24h', 0);
    });

    it('should check that basic time picker has 12 hours format', async () => {
        await checkTimeFormat('12h', 1);
    });

    it('should check that time picker with reactive forms has 24 hours format', async () => {
        await checkTimeFormat('24h', 6);
    });

    it('should check that time picker with reactive forms has 12 hours format', async () => {
        await checkTimeFormat('12h', 7);
    });

    it('should check that time picker with template forms has 24 hours format', async () => {
        await checkTimeFormat('24h', 12);
    });

    it('should check that time picker with template forms has 12 hours format', async () => {
        await checkTimeFormat('12h', 13);
    });

    it('Verify LTR / RTL switcher', async () => {
        await timePickerPage.checkRtlSwitch();
    });

    async function checkTimeFormat(format: '24h' | '12h', buttonIndex: number = 0): Promise<void> {
        await click(activeTimePickerButton, buttonIndex);
        const arr: number[] = [];
        for (let i = 0; i < (await getElementArrayLength(hoursColumn + columnItem)); i++) {
            arr.push(parseInt(await getText(hoursColumn + selectedTimeItem)));
            await click(navigationDownArrowButton);
        }

        const max = arr.reduce((a: number, b: number) => Math.max(a, b), 0);

        if (format === '12h') {
            await expect(max).not.toBeGreaterThan(12);
            await click(thirdColumn);
            await expect((await getText(thirdColumn + columnItem)).trim()).toBe('AM');
            await expect((await getText(thirdColumn + columnItem, 1)).trim()).toBe('PM');
        }
        if (format === '24h') {
            await expect(max).toBe(23);
        }
    }
});
