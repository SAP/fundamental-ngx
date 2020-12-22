import { webDriver } from '../../driver/wdio';
import { ComboBoxPo } from '../pages/combobox.po';
import {activeTypeNames, notActiveTypeNames, appleOption, bananaOption} from '../fixtures/appData/combobox.page-content';
import { checkNotFocused, checkTextValueContain } from '../../helper/assertion-helper';

describe('Combobox test suite', function() {
    const comboBoxPage: ComboBoxPo = new ComboBoxPo();

    beforeAll(() => {
        comboBoxPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('Verify each combobox consist of input and button', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            webDriver.scrollIntoView(comboBoxPage.comboBoxButtons(activeTypeNames[i]));
            webDriver.waitForDisplayed(comboBoxPage.comboBoxButtons(activeTypeNames[i]));
            webDriver.scrollIntoView(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
            webDriver.waitForDisplayed(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
            webDriver.waitForClickable(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
        }
        for (let i = 0; i < notActiveTypeNames.length; i++) {
            webDriver.scrollIntoView(comboBoxPage.comboBoxInputs(notActiveTypeNames[i]));
            webDriver.waitForDisplayed(comboBoxPage.comboBoxInputs(notActiveTypeNames[i]));
            webDriver.waitForUnclickable(comboBoxPage.comboBoxInputs(notActiveTypeNames[i]));
        }
    });

    it('Verify dropdown expands after clicking on the button', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            webDriver.sendKeys(['Escape'])
            webDriver.scrollIntoView(comboBoxPage.comboBoxButtons(activeTypeNames[i]));
            webDriver.pause(200);
            webDriver.click(comboBoxPage.comboBoxButtons(activeTypeNames[i]));
            webDriver.pause(500);
            webDriver.waitForPresent(comboBoxPage.comboBoxExpandedButtons(activeTypeNames[i]));
            webDriver.waitForPresent(comboBoxPage.comboBoxDropdownExpanded);
        }
    });

    it('Verify each input while typing', () => {
        for (let i = 0; i < activeTypeNames.length - 1; i++) {
            webDriver.scrollIntoView(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
            webDriver.clearValue(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
            webDriver.setValue(comboBoxPage.comboBoxInputs(activeTypeNames[i]), appleOption.substring(0, 2));
            comboBoxPage.selectOption(activeTypeNames[i], appleOption);
            webDriver.waitForDisplayed(comboBoxPage.filledComboBoxInputs(activeTypeNames[i], appleOption));
        }
    });

    it('Verify dropdown collapsed after selecting an option', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            comboBoxPage.selectOption(activeTypeNames[i], appleOption);
            checkNotFocused(comboBoxPage.comboBoxInput, i);
        }
    });

    it('Verify selected option is highlighted', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            comboBoxPage.selectOption(activeTypeNames[i], appleOption);
            expect(comboBoxPage.optionsArray).not.toBeVisible();
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            webDriver.waitForDisplayed(comboBoxPage.selectedDropDownOption(appleOption));
            comboBoxPage.selectOption(activeTypeNames[i], bananaOption);
            expect(comboBoxPage.optionsArray).not.toBeVisible();
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            webDriver.waitForDisplayed(comboBoxPage.selectedDropDownOption(bananaOption));
        }
    });

    // Need to debug on different browsers
    xit('Verify option hint when entering first characters', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            webDriver.scrollIntoView(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
            webDriver.setValue(comboBoxPage.comboBoxInputs(activeTypeNames[i]), appleOption.substring(0, 2));
            webDriver.waitForDisplayed(comboBoxPage.comboBoxOptionHint(appleOption.substring(0, 2), appleOption.substring(2)));
        }
    })

    it('Verify LTR and RTL orientation', () => {
        comboBoxPage.checkRtlSwitch();
    })

    it('Verify group headers are not interactive.', () => {
        const headersQuantity = webDriver.getElementArrayLength(comboBoxPage.groupHeader);
        comboBoxPage.expandDropdown('group');
        for (let i = 0; i < headersQuantity; i++) {
            webDriver.scrollIntoView(comboBoxPage.groupHeader, i);
            webDriver.click(comboBoxPage.groupHeader, i);
            webDriver.waitForDisplayed(comboBoxPage.comboBoxDropdownExpanded);
        }
    })

    it('Verify navigation by arrow buttons', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            const firstOptionText = webDriver.getText(comboBoxPage.optionsArray, 0);
            const secondOptionText = webDriver.getText(comboBoxPage.optionsArray, 1);
            webDriver.sendKeys(['ArrowDown']);
            webDriver.sendKeys(['Enter']);
            let inputText = webDriver.getText(comboBoxPage.comboBoxInput, i);
            checkTextValueContain(firstOptionText, inputText);
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            webDriver.sendKeys(['ArrowDown', 'ArrowDown']);
            webDriver.sendKeys(['Enter']);
            inputText = webDriver.getText(comboBoxPage.comboBoxInput, i);
            checkTextValueContain(secondOptionText, inputText);
        }
    })

    it('Verify combobox with two columns while typing', () => {
        webDriver.scrollIntoView(comboBoxPage.comboboxTwoColumns);
        webDriver.setValue(comboBoxPage.comboboxTwoColumns, 'Frui');
        comboBoxPage.selectOption('columns', 'Banana');
    })

    it('Verify options sorting', () => {
       for (let i = 0; i < activeTypeNames.length; i++) {
           comboBoxPage.expandDropdown(activeTypeNames[i]);
           webDriver.waitForDisplayed(comboBoxPage.optionsArray);
           const textArr = webDriver.getTextArr(comboBoxPage.optionsArray, 0, -1);
           expect(textArr.sort()).toEqual(textArr);
       }
    });
});
