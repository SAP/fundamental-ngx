import {
    browserIsIE,
    clearValue,
    click, getAttributeByName,
    getElementArrayLength,
    getText,
    getTextArr,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForClickable,
    waitForElDisplayed,
    waitForPresent,
    waitForUnclickable
} from '../../driver/wdio';
import { ComboBoxPo } from '../pages/combobox.po';
import {
    activeTypeNames,
    appleOption,
    bananaOption,
    notActiveTypeNames
} from '../fixtures/appData/combobox.page-content';
import { checkNotFocused, checkTextValueContain } from '../../helper/assertion-helper';

describe('Combobox test suite', function() {
    const comboBoxPage: ComboBoxPo = new ComboBoxPo();
    const {
        pageTitle, comboBoxRoot, comboBoxDropdownExpanded, groupHeader, comboboxWithGroup, comboboxTwoColumns,
        optionsArray, comboBoxInput, selectedDropDownOption, dropDownOption, comboBoxOptionHint, comboBoxButtons,
        comboBoxExpandedButtons, comboBoxInputs, filledComboBoxInputs
    } = comboBoxPage;

    beforeAll(() => {
        comboBoxPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(pageTitle);
    }, 1);

    it('Verify each combobox consist of input and button', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            scrollIntoView(comboBoxButtons(activeTypeNames[i]));
            waitForElDisplayed(comboBoxButtons(activeTypeNames[i]));
            scrollIntoView(comboBoxInputs(activeTypeNames[i]));
            waitForElDisplayed(comboBoxInputs(activeTypeNames[i]));
            waitForClickable(comboBoxInputs(activeTypeNames[i]));
        }
        for (let i = 0; i < notActiveTypeNames.length; i++) {
            scrollIntoView(comboBoxInputs(notActiveTypeNames[i]));
            waitForElDisplayed(comboBoxInputs(notActiveTypeNames[i]));
            if (i === 1) {
                waitForUnclickable(comboBoxInputs(notActiveTypeNames[i]));
            }
        }
    });

    it('Verify dropdown expands after clicking on the button', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            sendKeys(['Escape']);
            scrollIntoView(comboBoxButtons(activeTypeNames[i]));
            pause(200);
            click(comboBoxButtons(activeTypeNames[i]));
            pause(500);
            waitForPresent(comboBoxExpandedButtons(activeTypeNames[i]));
            waitForPresent(comboBoxDropdownExpanded);
        }
    });

    xit('Verify each input while typing', () => {
        if (browserIsIE()) {
            console.log('skip IE');
            return;
        }
        for (let i = 0; i < activeTypeNames.length - 1; i++) {
            scrollIntoView(comboBoxInputs(activeTypeNames[i]));
            clearValue(comboBoxInputs(activeTypeNames[i]));
            setValue(comboBoxInputs(activeTypeNames[i]), appleOption.substring(0, 2));
            comboBoxPage.selectOption(activeTypeNames[i], appleOption);
            waitForElDisplayed(filledComboBoxInputs(activeTypeNames[i], appleOption));
        }
    });

    xit('Verify dropdown collapsed after selecting an option', () => {
        if (browserIsIE()) {
            console.log('Skip for IE');
            return;
        }
        for (let i = 0; i < activeTypeNames.length; i++) {
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            comboBoxPage.selectOption(activeTypeNames[i], appleOption);
            checkNotFocused(comboBoxInput, i);
        }
    });

    xit('Verify selected option is highlighted', () => {
        if (browserIsIE()) {
            console.log('Skip for IE');
            return;
        }
        for (let i = 0; i < activeTypeNames.length; i++) {
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            comboBoxPage.selectOption(activeTypeNames[i], appleOption);
            expect(optionsArray).not.toBeVisible();
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            waitForElDisplayed(selectedDropDownOption(appleOption));
            comboBoxPage.selectOption(activeTypeNames[i], bananaOption);
            expect(optionsArray).not.toBeVisible();
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            waitForElDisplayed(selectedDropDownOption(bananaOption));
        }
    });

    // Need to debug on different browsers
    xit('Verify option hint when entering first characters', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            scrollIntoView(comboBoxInputs(activeTypeNames[i]));
            setValue(comboBoxInputs(activeTypeNames[i]), appleOption.substring(0, 2));
            waitForElDisplayed(comboBoxOptionHint(appleOption.substring(0, 2), appleOption.substring(2)));
        }
    });

    it('Verify LTR and RTL orientation', () => {
        comboBoxPage.checkRtlSwitch();
    });

    it('Verify group headers are not interactive.', () => {
        const headersQuantity = getElementArrayLength(groupHeader);
        comboBoxPage.expandDropdown('group');
        for (let i = 0; i < headersQuantity; i++) {
            scrollIntoView(groupHeader, i);
            click(groupHeader, i);
            waitForElDisplayed(comboBoxDropdownExpanded);
        }
    });

    it('Verify navigation by arrow buttons', () => {
       if (browserIsIE()) {
            console.log('Skip for IE');
            return;
        }
        for (let i = 0; i < activeTypeNames.length; i++) {
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            const firstOptionText = getText(optionsArray, 0);
            const secondOptionText = getText(optionsArray, 1);
            if (getAttributeByName(optionsArray, 'tabindex') === '-1') {
                sendKeys(['ArrowDown']);
            }
            sendKeys(['ArrowDown']);
            sendKeys(['Enter']);
            let inputText = getText(comboBoxInput, i);
            checkTextValueContain(firstOptionText, inputText);
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            sendKeys(['ArrowDown', 'ArrowDown']);
            sendKeys(['Enter']);
            inputText = getText(comboBoxInput, i);
            checkTextValueContain(secondOptionText, inputText);
        }
    });

    xit('Verify combobox with two columns while typing', () => {
        scrollIntoView(comboboxTwoColumns);
        setValue(comboboxTwoColumns, 'Frui');
        comboBoxPage.selectOption('columns', 'Banana');
    });

    it('Verify options sorting', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            waitForElDisplayed(optionsArray);
            const textArr = getTextArr(optionsArray, 0, -1);
            expect(textArr.sort()).toEqual(textArr);
        }
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            comboBoxPage.saveExampleBaselineScreenshot();
            expect(comboBoxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
