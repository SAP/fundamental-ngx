import {
    browserIsFirefox,
    browserIsIE,
    checkTextValueContain,
    clearValue,
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getText,
    getTextArr,
    getValue,
    isElementDisplayed,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForClickable,
    waitForElDisplayed,
    waitForPresent,
    waitForUnclickable
} from '../../../../../e2e';
import { ComboBoxPo } from './combobox.po';
import { activeTypeNames, appleOption, bananaOption, notActiveTypeNames } from './combobox.page-content';

describe('Combobox test suite', () => {
    const comboBoxPage: ComboBoxPo = new ComboBoxPo();
    const {
        comboBoxDropdownExpanded,
        groupHeader,
        comboboxTwoColumns,
        optionsArray,
        comboBoxInput,
        mobileComboBoxInput,
        selectedDropDownOption,
        comboBoxOptionHint,
        comboBoxButtons,
        comboBoxExpandedButtons,
        comboBoxInputs
    } = comboBoxPage;

    beforeAll(async () => {
        await comboBoxPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(comboBoxPage.root);
        await waitForElDisplayed(comboBoxPage.title);
    }, 1);

    it('Verify each combobox consist of input and button', async () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            await scrollIntoView(comboBoxButtons(activeTypeNames[i]));
            await waitForElDisplayed(comboBoxButtons(activeTypeNames[i]));
            await scrollIntoView(comboBoxInputs(activeTypeNames[i]));
            await waitForElDisplayed(comboBoxInputs(activeTypeNames[i]));
            await waitForClickable(comboBoxInputs(activeTypeNames[i]));
        }
        for (let i = 0; i < notActiveTypeNames.length; i++) {
            await scrollIntoView(comboBoxInputs(notActiveTypeNames[i]));
            await waitForElDisplayed(comboBoxInputs(notActiveTypeNames[i]));
            if (i === 1) {
                await waitForUnclickable(comboBoxInputs(notActiveTypeNames[i]));
            }
        }
    });

    it('Verify dropdown expands after clicking on the button', async () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            await sendKeys(['Escape']);
            await scrollIntoView(comboBoxButtons(activeTypeNames[i]));
            await pause(200);
            await click(comboBoxButtons(activeTypeNames[i]));
            await pause(500);
            await waitForPresent(comboBoxExpandedButtons(activeTypeNames[i]));
            await waitForPresent(comboBoxDropdownExpanded);
        }
    });

    it('Verify each input while typing', async () => {
        if (await browserIsIE()) {
            console.log('skip IE');
            return;
        }
        for (let i = 0; i < activeTypeNames.length - 1; i++) {
            await scrollIntoView(comboBoxInputs(activeTypeNames[i]));
            await clearValue(comboBoxInputs(activeTypeNames[i]));
            await setValue(comboBoxInputs(activeTypeNames[i]), appleOption.substring(0, 2));
            await comboBoxPage.selectOption(activeTypeNames[i], appleOption);
            await expect(await getValue(comboBoxInputs(activeTypeNames[i]))).toEqual(appleOption);
        }
    });

    it('Verify selected option is highlighted', async () => {
        if (await browserIsIE()) {
            console.log('Skip for IE');
            return;
        }
        for (let i = 0; i < activeTypeNames.length; i++) {
            await comboBoxPage.expandDropdown(activeTypeNames[i]);
            await expect(await isElementDisplayed(optionsArray)).toBe(true);
            await comboBoxPage.selectOption(activeTypeNames[i], appleOption);
            await expect(await doesItExist(optionsArray)).toBe(false);
            await comboBoxPage.expandDropdown(activeTypeNames[i]);
            await waitForElDisplayed(selectedDropDownOption(appleOption));
            await comboBoxPage.selectOption(activeTypeNames[i], bananaOption);
            await expect(await doesItExist(optionsArray)).toBe(false);
            await comboBoxPage.expandDropdown(activeTypeNames[i]);
            await waitForElDisplayed(selectedDropDownOption(bananaOption));
        }
    });

    it('Verify option hint when entering first characters', async () => {
        if (await browserIsFirefox()) {
            return;
        }
        for (let i = 0; i < activeTypeNames.length; i++) {
            await scrollIntoView(comboBoxInputs(activeTypeNames[i]));
            await setValue(comboBoxInputs(activeTypeNames[i]), appleOption.substring(0, 2));
            await waitForElDisplayed(comboBoxOptionHint(appleOption.substring(0, 2), appleOption.substring(2)));
        }
    });

    it('Verify LTR and RTL orientation', async () => {
        await comboBoxPage.checkRtlSwitch();
    });

    it('Verify group headers are not interactive.', async () => {
        const headersQuantity = await getElementArrayLength(groupHeader);
        await comboBoxPage.expandDropdown('group');
        for (let i = 0; i < headersQuantity; i++) {
            await scrollIntoView(groupHeader, i);
            await click(groupHeader, i);
            await waitForElDisplayed(comboBoxDropdownExpanded);
        }
    });

    it('Verify navigation by arrow buttons', async () => {
        if (await browserIsIE()) {
            console.log('Skip for IE');
            return;
        }
        for (let i = 0; i < activeTypeNames.length; i++) {
            await comboBoxPage.expandDropdown(activeTypeNames[i]);
            const firstOptionText = await getText(optionsArray, 0);
            const secondOptionText = await getText(optionsArray, 1);
            if ((await getAttributeByName(optionsArray, 'tabindex')) === '-1') {
                await sendKeys(['ArrowDown']);
            }
            await sendKeys(['ArrowDown']);
            await sendKeys(['Enter']);
            let inputText = await getText(comboBoxInput, i);
            await checkTextValueContain(firstOptionText, inputText);
            await comboBoxPage.expandDropdown(activeTypeNames[i]);
            await sendKeys(['ArrowDown', 'ArrowDown']);
            await sendKeys(['Enter']);
            inputText = await getText(comboBoxInput, i);
            await checkTextValueContain(secondOptionText, inputText);
        }
    });

    it('Verify combobox with two columns while typing', async () => {
        await scrollIntoView(comboboxTwoColumns);
        await setValue(comboboxTwoColumns, 'Frui');
        await comboBoxPage.selectOption('columns', 'Banana');
    });

    it('Verify options sorting', async () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            await comboBoxPage.expandDropdown(activeTypeNames[i]);
            await waitForElDisplayed(optionsArray);
            const textArr = await getTextArr(optionsArray, 0, -1);
            await expect(textArr.sort()).toEqual(textArr);
        }
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/7111
    xit('should check that value is not present in the input until you click Save', async () => {
        const defaultValue = await getValue(mobileComboBoxInput);
        await scrollIntoView(mobileComboBoxInput);
        await click(mobileComboBoxInput);
        await click(optionsArray);
        await expect(await getValue(mobileComboBoxInput)).toBe(defaultValue);
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await comboBoxPage.saveExampleBaselineScreenshot();
            await expect(await comboBoxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
